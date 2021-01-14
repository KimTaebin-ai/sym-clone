import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatternMealPage } from './pattern-meal.page';

const routes: Routes = [
  {
    path: '',
    component: PatternMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternMealPageRoutingModule {}
