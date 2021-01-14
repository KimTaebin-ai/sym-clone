import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmotionInfoModalPage } from './emotion-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmotionInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmotionInfoModalPageRoutingModule {}
