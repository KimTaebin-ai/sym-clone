import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatternDrinkingPage} from './pattern-drinking.page';


const routes: Routes = [
  {
    path: '',
    component: PatternDrinkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatternDrinkingPageRoutingModule {}
