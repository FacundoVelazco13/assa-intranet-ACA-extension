/* eslint-disable license-header/header */
import { Component, ViewEncapsulation } from '@angular/core';
import { TaskListCloudComponent, StartProcessCloudComponent } from '@alfresco/adf-process-services-cloud';
import { DataColumnListComponent, DataColumnComponent } from '@alfresco/adf-core';
@Component({
  selector: 'aca-process-test',
  imports: [TaskListCloudComponent, DataColumnListComponent, DataColumnComponent, StartProcessCloudComponent],
  templateUrl: './process-test.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProcessTestComponent {
  YOUR_APP_ID = 1;
  YOUR_APP_NAME = 'intranet-app';
}
