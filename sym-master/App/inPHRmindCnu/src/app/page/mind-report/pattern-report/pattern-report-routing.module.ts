import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternReportPage } from './pattern-report.page';

const routes: Routes = [
  {
    path: '',
    component: PatternReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternReportPageRoutingModule {}
