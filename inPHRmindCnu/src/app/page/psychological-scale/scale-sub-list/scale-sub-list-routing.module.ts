import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScaleSubListPage } from './scale-sub-list.page';

const routes: Routes = [
  {
    path: '',
    component: ScaleSubListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScaleSubListPageRoutingModule {}
