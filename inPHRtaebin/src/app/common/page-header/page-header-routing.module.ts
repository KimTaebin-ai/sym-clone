import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageHeaderPage } from './page-header.page';

const routes: Routes = [
  {
    path: '',
    component: PageHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageHeaderPageRoutingModule {}
