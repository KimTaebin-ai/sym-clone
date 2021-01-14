import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoModalPageRoutingModule } from './more-info-modal-routing.module';

import { MoreInfoModalPage } from './more-info-modal.page';
import {LoadingPageModule} from '../../common/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MoreInfoModalPageRoutingModule,
        LoadingPageModule
    ],
  declarations: [MoreInfoModalPage]
})
export class MoreInfoModalPageModule {}
