import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanicDiaryPage } from './panic-diary.page';

const routes: Routes = [
  {
    path: '',
    component: PanicDiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanicDiaryPageRoutingModule {}
