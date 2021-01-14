import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifelogPage } from './lifelog.page';

const routes: Routes = [
  {
    path: '',
    component: LifelogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifelogPageRoutingModule {}
