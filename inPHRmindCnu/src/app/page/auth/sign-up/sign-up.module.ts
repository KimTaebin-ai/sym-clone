import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import {PageHeaderComponent} from '../../common/page-header/page-header.component';
import {DirectivesModule} from '../../../util/common/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignUpPageRoutingModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    exports: [
        PageHeaderComponent,
    ],
    declarations: [
        SignUpPage,
        PageHeaderComponent,
    ]
})
export class SignUpPageModule {}
