import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoLoginModalPage } from './auto-login-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AutoLoginModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoLoginModalPageRoutingModule {}
