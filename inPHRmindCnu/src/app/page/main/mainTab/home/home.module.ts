import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {Tab2PageModule} from '../tab2/tab2.module';
import {FabComponent} from '../../common/fab/fab.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        Tab2PageModule
    ],
    exports: [
        FabComponent
    ],
    declarations: [HomePage, FabComponent]
})
export class HomePageModule {}
