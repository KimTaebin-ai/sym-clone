import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertStepPage } from './insert-step.page';

const routes: Routes = [
  {
    path: '',
    component: InsertStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertStepPageRoutingModule {}
