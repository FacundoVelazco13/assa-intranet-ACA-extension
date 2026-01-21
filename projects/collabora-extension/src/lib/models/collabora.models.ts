/* eslint-disable license-header/header */

export interface CollaboraTokenResponse {
  access_token: string;
  access_token_ttl: string;
  wopi_src_url?: string;
}

export interface CollaboraWopiConfig {
  wopiHostUrl: string;
  wopiFileUrl: string;
  wopiSrcUrl: string;
  iFrameUrl: string;
}

export type CollaboraAction = 'edit' | 'view';
