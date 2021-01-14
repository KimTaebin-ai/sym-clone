import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../../../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {MainHeaderComponent} from '../../../common/main-header/main-header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  exports: [
    MainHeaderComponent
  ],
  declarations: [Tab2Page, MainHeaderComponent]
})
export class Tab2PageModule {}
