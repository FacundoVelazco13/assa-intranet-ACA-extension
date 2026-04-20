export interface AlfrescoApiResponseError {
  error: {
    errorKey: string;
    statusCode: number;
    briefSummary: string;
    stackTrace: string;
    descriptionURL: string;
    logId: string;
  };
}
