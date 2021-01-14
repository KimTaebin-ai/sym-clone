import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateIrbPage } from './update-irb.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateIrbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateIrbPageRoutingModule {}
