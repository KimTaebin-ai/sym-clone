import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceConnectionPage } from './device-connection.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceConnectionPageRoutingModule {}
