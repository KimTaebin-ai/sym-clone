import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingTermPage } from './setting-term.page';

const routes: Routes = [
  {
    path: '',
    component: SettingTermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingTermPageRoutingModule {}
