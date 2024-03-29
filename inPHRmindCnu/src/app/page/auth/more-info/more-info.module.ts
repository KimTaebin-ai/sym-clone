import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoPageRoutingModule } from './more-info-routing.module';

import { MoreInfoPage } from './more-info.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';
import {DirectivesModule} from '../../../util/common/directives.module';
import {LoadingPageModule} from '../../common/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MoreInfoPageRoutingModule,
        SignUpPageModule,
        DirectivesModule,
        LoadingPageModule
    ],
  declarations: [MoreInfoPage]
})
export class MoreInfoPageModule {}
