import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplatePageRoutingModule } from './template-routing.module';

import { TemplatePage } from './template.page';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { TabsPage } from 'src/app/common/tabs/tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatePageRoutingModule
  ],
  declarations: [TemplatePage, HeaderComponent, TabsPage]
})
export class TemplatePageModule {}
