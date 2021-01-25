import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoModalPageRoutingModule } from './more-info-modal-routing.module';

import { MoreInfoModalPage } from './more-info-modal.page';
import {LoadingPageModule} from '../../common/loading/loading.module';
import {DirectivesModule} from '../../../util/common/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MoreInfoModalPageRoutingModule,
        LoadingPageModule,
        DirectivesModule
    ],
  declarations: [MoreInfoModalPage]
})
export class MoreInfoModalPageModule {}
