import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareManagementPageRoutingModule } from './care-management-routing.module';

import { CareManagementPage } from './care-management.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareManagementPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [CareManagementPage]
})
export class CareManagementPageModule {}
