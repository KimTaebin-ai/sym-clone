import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TemplatePage } from '../../common/template/template.page';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { TabsPage } from 'src/app/common/tabs/tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TemplatePage, HeaderComponent, TabsPage]
})
export class HomePageModule {}
