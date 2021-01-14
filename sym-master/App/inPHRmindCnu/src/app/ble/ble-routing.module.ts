import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlePage } from './ble.page';

const routes: Routes = [
  {
    path: '',
    component: BlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlePageRoutingModule {}
