import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictionaryModalPage } from './dictionary-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DictionaryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryModalPageRoutingModule {}
