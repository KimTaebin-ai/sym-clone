import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTermPage } from './new-term.page';

const routes: Routes = [
  {
    path: '',
    component: NewTermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTermPageRoutingModule {}
