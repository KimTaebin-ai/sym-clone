import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepsPage } from './sleeps.page';

const routes: Routes = [
  {
    path: '',
    component: SleepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepsPageRoutingModule {}
