import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrbAgreeModalPage } from './irb-agree-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IrbAgreeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrbAgreeModalPageRoutingModule {}
