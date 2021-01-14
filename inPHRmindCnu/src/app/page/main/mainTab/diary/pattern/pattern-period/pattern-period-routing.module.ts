import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternPeriodPage } from './pattern-period.page';

const routes: Routes = [
  {
    path: '',
    component: PatternPeriodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternPeriodPageRoutingModule {}
