import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegCompletedPage } from './reg-completed.page';

const routes: Routes = [
  {
    path: '',
    component: RegCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegCompletedPageRoutingModule {}
