import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternSmokingPage } from './pattern-smoking.page';

const routes: Routes = [
  {
    path: '',
    component: PatternSmokingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternSmokingPageRoutingModule {}
