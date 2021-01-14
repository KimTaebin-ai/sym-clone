import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreInfoModalPage } from './more-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MoreInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreInfoModalPageRoutingModule {}
