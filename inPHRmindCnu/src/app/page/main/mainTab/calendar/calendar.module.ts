import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import {SignUpPageModule} from '../../../auth/sign-up/sign-up.module';
import {Tab2PageModule} from '../tab2/tab2.module';
import {LoadingPageModule} from '../../../common/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalendarPageRoutingModule,
        SignUpPageModule,
        Tab2PageModule,
        LoadingPageModule
    ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
