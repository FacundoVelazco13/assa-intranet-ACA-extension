/* eslint-disable license-header/header */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboraOnlineComponent } from './collabora-online.component';
import { CollaboraOnlineService } from '../services/collabora-online.service';
import { UserPreferencesService, ThumbnailService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentApiService } from '@alfresco/aca-shared';
import { of } from 'rxjs';

describe('CollaboraOnlineComponent', () => {
  let component: CollaboraOnlineComponent;
  let fixture: ComponentFixture<CollaboraOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CollaboraOnlineComponent],
      providers: [
        {
          provide: CollaboraOnlineService,
          useValue: {
            getLoolUrl: jasmine.createSpy('getLoolUrl').and.returnValue(Promise.resolve('http://localhost:9980/')),
            getAccessToken: jasmine
              .createSpy('getAccessToken')
              .and.returnValue(Promise.resolve({ access_token: 'token', access_token_ttl: '3600', wopi_src_url: 'http://localhost:9980/' })),
            getPreviousUrl: jasmine.createSpy('getPreviousUrl').and.returnValue('/')
          }
        },
        {
          provide: UserPreferencesService,
          useValue: { select: jasmine.createSpy('select').and.returnValue(of('en')) }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { nodeId: 'test-node-id', action: 'edit' } } }
        },
        {
          provide: ContentApiService,
          useValue: {
            getNode: jasmine.createSpy('getNode').and.returnValue(
              of({
                entry: {
                  name: 'test.docx',
                  content: { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
                }
              })
            )
          }
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') }
        },
        {
          provide: ThumbnailService,
          useValue: { getMimeTypeIcon: jasmine.createSpy('getMimeTypeIcon').and.returnValue('adf:file-word') }
        }
      ]
    });

    fixture = TestBed.createComponent(CollaboraOnlineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
