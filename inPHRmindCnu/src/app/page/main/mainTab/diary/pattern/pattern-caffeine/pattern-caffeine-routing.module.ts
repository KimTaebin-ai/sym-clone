import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternCaffeinePage } from './pattern-caffeine.page';

const routes: Routes = [
  {
    path: '',
    component: PatternCaffeinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternCaffeinePageRoutingModule {}
