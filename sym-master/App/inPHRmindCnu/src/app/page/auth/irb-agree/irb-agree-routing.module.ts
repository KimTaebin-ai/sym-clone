import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IrbAgreePage } from './irb-agree.page';

const routes: Routes = [
  {
    path: '',
    component: IrbAgreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IrbAgreePageRoutingModule {}
