import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermModalPage } from './term-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TermModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermModalPageRoutingModule {}
