import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictionaryModalPageRoutingModule } from './dictionary-modal-routing.module';

import { DictionaryModalPage } from './dictionary-modal.page';
import {LoadingPageModule} from '../../common/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DictionaryModalPageRoutingModule,
        LoadingPageModule
    ],
  declarations: [DictionaryModalPage]
})
export class DictionaryModalPageModule {}
