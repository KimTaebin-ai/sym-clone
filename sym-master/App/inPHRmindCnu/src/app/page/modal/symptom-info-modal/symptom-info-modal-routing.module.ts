import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomInfoModalPage } from './symptom-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomInfoModalPageRoutingModule {}
