import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IRBPage } from './irb.page';

const routes: Routes = [
  {
    path: '',
    component: IRBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IRBPageRoutingModule {}
