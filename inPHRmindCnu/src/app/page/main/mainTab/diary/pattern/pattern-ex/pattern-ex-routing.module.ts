import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternExPage } from './pattern-ex.page';

const routes: Routes = [
  {
    path: '',
    component: PatternExPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternExPageRoutingModule {}
