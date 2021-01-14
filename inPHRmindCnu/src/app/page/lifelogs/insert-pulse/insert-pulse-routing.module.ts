import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertPulsePage } from './insert-pulse.page';

const routes: Routes = [
  {
    path: '',
    component: InsertPulsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertPulsePageRoutingModule {}
