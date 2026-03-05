/* eslint-disable license-header/header */
import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHookService, ContentApiService, PageComponent, PageLayoutComponent, ToolbarComponent, NodePermissionService } from '@alfresco/aca-shared';
import { NavigateToPreviousPage, SetSelectedNodesAction, SetCurrentFolderAction } from '@alfresco/aca-shared/store';
import { BreadcrumbComponent, ContentService, NodesApiService, PermissionListComponent } from '@alfresco/adf-content-services';
import { CommonModule, Location } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MetadataTabComponent } from '@alfresco/aca-content';
import { first } from 'rxjs/operators';
import { ContentActionRef } from '@alfresco/adf-extensions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Node } from '@alfresco/js-api';

@Component({
  imports: [
    CommonModule,
    TranslatePipe,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatButtonModule,
    MetadataTabComponent,
    PageLayoutComponent,
    ToolbarComponent,
    PermissionListComponent,
    BreadcrumbComponent
  ],
  selector: 'aca-record-view',
  templateUrl: './record-view.component.html',
  styleUrl: './record-view.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecordViewComponent extends PageComponent implements OnInit, OnDestroy {
  nodeId: string;
  isLoading: boolean;
  activeTab = 0;
  aspectActions: Array<ContentActionRef> = [];
  nodeIcon: string;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly contentApi: ContentApiService = inject(ContentApiService);
  private readonly contentService: ContentService = inject(ContentService);
  private readonly nodesApiService: NodesApiService = inject(NodesApiService);
  private readonly appHookService: AppHookService = inject(AppHookService);
  private readonly location: Location = inject(Location);
  private readonly permissions = inject(NodePermissionService);

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.isLoading = true;
    const { route } = this;
    const { data } = route.snapshot;
    this.title = data.title;
    this.nodesApiService.nodeUpdated.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((node) => (this.node = { ...node }));
    this.appHookService.nodesDeleted.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.location.back());
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      this.setActiveTab(params.activeTab);
      this.nodeId = params.nodeId;
      this.contentApi.getNode(this.nodeId).subscribe({
        next: (node) => {
          this.node = node.entry;
          this.isLoading = false;
          this.setActiveTab(params.activeTab);
          this.store.dispatch(new SetSelectedNodesAction([{ entry: this.node }]));
          this.store.dispatch(new SetCurrentFolderAction(this.node));
          this.nodeIcon = this.contentService.getNodeIcon(this.node);
        },
        error: () => {
          console.error('Error al cargar el nodo');
        },
        complete: () => {
          this.extensions
            .getAllowedToolbarActions()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((actions) => {
              this.actions = actions;
            });
        }
      });
    });
    this.extensions
      .getAllowedSidebarActions()
      .pipe(first())
      .subscribe((aspectActions) => {
        this.aspectActions = aspectActions;
      });
  }

  setActiveTab(tabName: string) {
    switch (tabName) {
      case 'permissions':
        if (!this.canUpdatePermissions(this.node)) {
          this.activeTab = 0;
          break;
        }
        this.activeTab = 2;
        break;
      case 'metadata':
        this.activeTab = 1;
        break;
      case 'info':
      default:
        this.activeTab = 0;
    }
  }

  goBack() {
    this.store.dispatch(new NavigateToPreviousPage());
  }

  onBreadcrumbNavigate() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  canUpdatePermissions(node: Node): boolean {
    return this.permissions.check(node, ['updatePermissions']);
  }

  canCreate(node: Node): boolean {
    return this.permissions.check(node, ['create']);
  }

  canUpdate(node: Node): boolean {
    return this.permissions.check(node, ['update']);
  }

  customNodePath(node: Node): Node {
    if (!node?.path?.elements) {
      return node;
    }
    const clonedNode: Node = JSON.parse(JSON.stringify(node));
    if (clonedNode.path.elements.length > 2) {
      clonedNode.path.elements = clonedNode.path.elements.slice(-1);
    }
    return clonedNode;
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetSelectedNodesAction([]));
    super.ngOnDestroy();
  }
}
