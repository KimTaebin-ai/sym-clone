import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindPwPage } from './find-pw.page';

const routes: Routes = [
  {
    path: '',
    component: FindPwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindPwPageRoutingModule {}
