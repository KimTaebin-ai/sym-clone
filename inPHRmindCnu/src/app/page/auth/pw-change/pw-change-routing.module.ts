import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwChangePage } from './pw-change.page';

const routes: Routes = [
  {
    path: '',
    component: PwChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwChangePageRoutingModule {}
