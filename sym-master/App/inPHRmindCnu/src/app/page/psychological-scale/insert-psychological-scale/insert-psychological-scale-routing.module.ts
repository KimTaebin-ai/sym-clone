import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertPsychologicalScalePage } from './insert-psychological-scale.page';

const routes: Routes = [
  {
    path: '',
    component: InsertPsychologicalScalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertPsychologicalScalePageRoutingModule {}
