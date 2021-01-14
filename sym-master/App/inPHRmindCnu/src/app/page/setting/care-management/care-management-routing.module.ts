import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareManagementPage } from './care-management.page';

const routes: Routes = [
  {
    path: '',
    component: CareManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareManagementPageRoutingModule {}
