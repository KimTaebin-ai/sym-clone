import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictionaryPageRoutingModule } from './dictionary-routing.module';

import { DictionaryPage } from './dictionary.page';
import {Tab2PageModule} from '../tab2/tab2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DictionaryPageRoutingModule,
    Tab2PageModule
  ],
  declarations: [DictionaryPage]
})
export class DictionaryPageModule {}
