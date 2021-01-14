import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertSleepPage } from './insert-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: InsertSleepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertSleepPageRoutingModule {}
