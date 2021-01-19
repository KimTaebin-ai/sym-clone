import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TemplatePage } from '../components/common/template/template.page';
import { HeaderComponent } from 'src/app/pages/components/common/header/header.component';
import { TabsPage } from 'src/app/pages/components/common/tabs/tabs.page';
import { HomeInputComponent } from '../components/home-input/home-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TemplatePage, HeaderComponent, TabsPage, HomeInputComponent]
})
export class HomePageModule {}
