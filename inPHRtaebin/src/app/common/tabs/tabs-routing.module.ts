import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
// import {HomePageModule} from '../../pages/component/home/home.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () => import('../../pages/components/home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'diary',
        // loadChildren: () => import('../../pages/component/diary/diary.module').then(m => m.DiaryPageModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/home',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
