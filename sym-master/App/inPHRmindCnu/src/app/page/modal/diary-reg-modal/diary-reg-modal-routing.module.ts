import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryRegModalPage } from './diary-reg-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DiaryRegModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryRegModalPageRoutingModule {}
