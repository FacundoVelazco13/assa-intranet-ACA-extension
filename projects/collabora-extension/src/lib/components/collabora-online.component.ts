/* eslint-disable license-header/header */
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentApiService } from '@alfresco/aca-shared';
import { NodeEntry } from '@alfresco/js-api';
import {
  UserPreferencesService,
  UserPreferenceValues,
  ToolbarComponent,
  ToolbarTitleComponent,
  ToolbarDividerComponent,
  ViewerToolbarActionsComponent,
  ThumbnailService
} from '@alfresco/adf-core';
import { CollaboraOnlineService } from '../services/collabora-online.service';
import { firstValueFrom } from 'rxjs';
import { CollaboraTokenResponse, CollaboraAction } from '../models/collabora.models';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'collabora-online',
  templateUrl: './collabora-online.component.html',
  styleUrls: ['./collabora-online.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [ToolbarComponent, ToolbarTitleComponent, MatIcon, ToolbarDividerComponent, ViewerToolbarActionsComponent, TranslatePipe]
})
export class CollaboraOnlineComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('form') postForm: ElementRef;
  @ViewChild('access_token') inputToken: ElementRef;
  @ViewChild('access_token_ttl') inputTokenTTL: ElementRef;
  @ViewChild('loleafletFrame') loleafletFrame: ElementRef;

  action: CollaboraAction;
  nodeId: string;
  nodeEntry: NodeEntry | null = null;
  fileName: string;
  mimeType: string;
  mimeTypeIcon: string;
  previousUrl: string;
  accessToken: string;
  accessTokenTTL: string;
  iFrameUrl: string;
  listenerHandlePostMessage: ((event: MessageEvent) => void) | null = null;
  locale: string;

  constructor(
    private collaboraOnlineService: CollaboraOnlineService,
    private userPreferencesService: UserPreferencesService,
    private route: ActivatedRoute,
    private contentApi: ContentApiService,
    private router: Router,
    private thumbnailService: ThumbnailService
  ) {
    this.action = this.route.snapshot.params['action'] as CollaboraAction;
    this.nodeId = this.route.snapshot.params['nodeId'];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.nodeEntry = await firstValueFrom(this.contentApi.getNode(this.nodeId));
      if (this.nodeEntry) {
        this.fileName = this.nodeEntry.entry.name;
        if (this.nodeEntry.entry.content) {
          this.mimeType = this.nodeEntry.entry.content.mimeType;
          this.mimeTypeIcon = this.thumbnailService.getMimeTypeIcon(this.mimeType);
        }
      }
      this.userPreferencesService
        .select(UserPreferenceValues.Locale)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((locale) => (this.locale = locale));

      // Get previous url
      this.previousUrl = this.collaboraOnlineService.getPreviousUrl();

      // Get url du serveur collabora online
      // Esta función estaba generando el bug.
      const wopiHostUrl = await this.collaboraOnlineService.getLoolUrl();
      const wopiFileUrl = wopiHostUrl + 'wopi/files/' + this.nodeId;

      // Get token pour l'édition du document
      let responseToken: CollaboraTokenResponse = await this.collaboraOnlineService.getAccessToken(this.nodeId, this.action);
      this.accessToken = responseToken.access_token;
      this.accessTokenTTL = responseToken.access_token_ttl;

      if (!responseToken.wopi_src_url || responseToken.wopi_src_url === '') {
        responseToken = await this.collaboraOnlineService.getAccessToken(this.nodeId, 'edit');
      }

      const wopiSrcUrl = responseToken.wopi_src_url;
      this.iFrameUrl = wopiSrcUrl + 'WOPISrc=' + encodeURIComponent(wopiFileUrl) + '&lang=' + this.locale;

      if (this.action === 'view') {
        this.iFrameUrl += '&permission=readonly';
      }

      // Remplissage du formulaire dynamique
      this.postForm.nativeElement.action = this.iFrameUrl;
      this.inputToken.nativeElement.value = this.accessToken;
      this.inputTokenTTL.nativeElement.value = this.accessTokenTTL;

      // Déclenchement du post
      this.postForm.nativeElement.submit();

      // Ajout de listener pour les évènement
      if (!this.listenerHandlePostMessage) {
        this.listenerHandlePostMessage = this.handlePostMessage.bind(this);
      }
      window.addEventListener('message', this.listenerHandlePostMessage, true);
    } catch (error) {
      console.error('Error initializing Collabora Online:', error);
      // Navigate back on error
      this.router.navigateByUrl(this.previousUrl || '/');
    }
  }

  ngOnDestroy(): void {
    if (this.listenerHandlePostMessage) {
      window.removeEventListener('message', this.listenerHandlePostMessage, true);
    }
  }
  // TODO : revisar esta función
  private handlePostMessage(event: MessageEvent): void {
    try {
      // Skip if data is not a string or is already an object
      if (typeof event.data !== 'string') {
        return;
      }

      // Try to parse JSON, skip if invalid
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        // Not a JSON message, ignore
        return;
      }

      const id = message.MessageId;
      const values = message.Values;

      if (!id) {
        return; // No MessageId, not a Collabora message
      }

      switch (id) {
        case 'UI_Close':
          // eslint-disable-next-line no-console
          console.log('PostMessage Received: UI_Close - navigating back');
          this.router.navigateByUrl(this.previousUrl);
          break;
        case 'App_LoadingStatus':
          if (values?.Status === 'Frame_Ready') {
            // Add readonly
          }
          // eslint-disable-next-line no-console
          console.log('PostMessage Received: App_LoadingStatus - Status:', values?.Status);
          break;
        case 'View_Added':
          // eslint-disable-next-line no-console
          console.log('PostMessage Received: View_Added - Values:', JSON.stringify(values));
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('MessageID:', id, '- Values:', values);
      }
    } catch (error) {
      console.error('Error handling post message:', error);
    }
  }

  onBackButtonClick(): void {
    this.router.navigateByUrl(this.previousUrl);
  }

  onFullscreenClick(): void {
    const container = <any>document.documentElement.querySelector('.adf-viewer__fullscreen-container');
    if (container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    }
  }
}
