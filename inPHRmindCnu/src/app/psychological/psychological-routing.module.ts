import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychologicalPage } from './psychological.page';

const routes: Routes = [
  {
    path: '',
    component: PsychologicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychologicalPageRoutingModule {}
