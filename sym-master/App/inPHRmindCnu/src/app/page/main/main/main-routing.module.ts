import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {TabsPage} from '../../../tabs/tabs.page';

const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../mainTab/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../mainTab/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'psychological-scale',
        loadChildren: () => import('../mainTab/psychological-scale/psychological-scale.module').then(m => m.PsychologicalScalePageModule)
      },
      {
        path: 'diary',
        loadChildren: () => import('../mainTab/diary/diary.module').then(m => m.DiaryPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../mainTab/calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'dictionary',
        loadChildren: () => import('../mainTab/dictionary/dictionary.module').then( m => m.DictionaryPageModule)
      },
      {
        path: 'lifelog',
        loadChildren: () => import('../mainTab/lifelog/lifelog.module').then(m => m.LifelogPageModule)
      },
      {
        path: 'mind-report',
        loadChildren: () => import('../../mind-report/mind-report.module').then(m => m.MindReportPageModule)
      },
      {
        path: '',
        redirectTo: 'main/home',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: 'main/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
