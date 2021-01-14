import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternDringingPage } from './pattern-dringing.page';

const routes: Routes = [
  {
    path: '',
    component: PatternDringingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternDringingPageRoutingModule {}
