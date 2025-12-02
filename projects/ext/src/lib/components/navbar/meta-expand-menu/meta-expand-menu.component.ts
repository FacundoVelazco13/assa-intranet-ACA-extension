/* eslint-disable license-header/header */
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavBarLinkRef } from '@alfresco/adf-extensions';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@alfresco/adf-core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActiveLinkDirective, ActionDirective, ExpandMenuComponent } from '@alfresco/aca-content';

@Component({
  selector: 'aca-meta-expand-menu',
  imports: [CommonModule, IconComponent, MatButtonModule, ActiveLinkDirective, ActionDirective, MatExpansionModule, ExpandMenuComponent],
  templateUrl: './meta-expand-menu.component.html',
  styleUrl: './meta-expand-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MetaExpandMenuComponent implements OnInit {
  @Input({ required: true })
  item: NavBarLinkRef;

  @Output()
  actionClicked = new EventEmitter<NavBarLinkRef>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.cd.detectChanges();
  }
  onActionClick(item: NavBarLinkRef) {
    // eslint-disable-next-line no-console
    console.log('hijo clickeado', item);
  }

  trackById(_index: number, obj: NavBarLinkRef) {
    return obj.id;
  }
}
