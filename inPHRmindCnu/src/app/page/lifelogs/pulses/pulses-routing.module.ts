import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PulsesPage } from './pulses.page';

const routes: Routes = [
  {
    path: '',
    component: PulsesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PulsesPageRoutingModule {}
