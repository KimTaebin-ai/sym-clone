import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformSignUpPage } from './platform-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: PlatformSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformSignUpPageRoutingModule {}
