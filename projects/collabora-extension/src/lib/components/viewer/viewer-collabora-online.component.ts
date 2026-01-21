/* eslint-disable license-header/header */
/* eslint-disable @angular-eslint/component-selector */

import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CollaboraOnlineService } from '../../services/collabora-online.service';
import { UserPreferencesService, UserPreferenceValues } from '@alfresco/adf-core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'viewer-collabora-online',
  templateUrl: './viewer-collabora-online.component.html',
  styleUrls: ['./viewer-collabora-online.component.scss'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None
})
export class ViewerCollaboraOnlineComponent implements OnInit, OnDestroy {
  @ViewChild('form') postForm: ElementRef;
  @ViewChild('access_token') inputToken: ElementRef;
  @ViewChild('access_token_ttl') inputTokenTTL: ElementRef;
  @ViewChild('loleafletFrame') loleafletFrame: ElementRef;

  @Input()
  nodeId: string;

  accessToken: string;
  accessTokenTTL: string;
  iFrameUrl: string;
  locale: string;

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private collaboraOnlineService: CollaboraOnlineService,
    private userPreferencesService: UserPreferencesService
  ) {}

  async ngOnInit() {
    this.userPreferencesService
      .select(UserPreferenceValues.Locale)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((locale) => (this.locale = locale));

    // eslint-disable-next-line no-console
    console.log('Node id : ' + this.nodeId);
    // Get url du serveur collabora online
    const wopiHostUrl = await this.collaboraOnlineService.getLoolUrl();
    const wopiFileUrl = wopiHostUrl + 'wopi/files/' + this.nodeId;

    // Get token pour l'édition du document
    let responseToken: any = await this.collaboraOnlineService.getAccessToken(this.nodeId, 'edit');
    this.accessToken = responseToken.access_token;
    this.accessTokenTTL = responseToken.access_token_ttl;
    if (!responseToken.wopi_src_url || responseToken.wopi_src_url === '') {
      responseToken = await this.collaboraOnlineService.getAccessToken(this.nodeId, 'view');
    }
    const wopiSrcUrl = responseToken.wopi_src_url;
    this.iFrameUrl = wopiSrcUrl + 'WOPISrc=' + encodeURI(wopiFileUrl) + '&lang=' + this.locale;

    // Remplissage du formulaire dynamique
    this.postForm.nativeElement.action = this.iFrameUrl;
    this.inputToken.nativeElement.value = this.accessToken;
    this.inputTokenTTL.nativeElement.value = this.accessTokenTTL;

    // Déclenchement du post
    this.postForm.nativeElement.submit();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
