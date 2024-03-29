import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {Tab2PageModule} from '../tab2/tab2.module';
import {BLE} from '@ionic-native/ble/ngx';
import {LoadingPageModule} from '../../../common/loading/loading.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        Tab2PageModule,
        LoadingPageModule
    ],
  providers: [
    BLE
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
