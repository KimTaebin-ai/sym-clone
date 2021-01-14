import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternPhysiologyPage } from './pattern-physiology.page';

const routes: Routes = [
  {
    path: '',
    component: PatternPhysiologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternPhysiologyPageRoutingModule {}
