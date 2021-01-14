import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifelogPageRoutingModule } from './lifelog-routing.module';

import { LifelogPage } from './lifelog.page';
import {Tab2PageModule} from '../tab2/tab2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifelogPageRoutingModule,
    Tab2PageModule
  ],
  declarations: [LifelogPage]
})
export class LifelogPageModule {}
