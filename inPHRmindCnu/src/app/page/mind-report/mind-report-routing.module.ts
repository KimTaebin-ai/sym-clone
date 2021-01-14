import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MindReportPage } from './mind-report.page';

const routes: Routes = [
  {
    path: '',
    component: MindReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MindReportPageRoutingModule {}
