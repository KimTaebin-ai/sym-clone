import { NgModule } from '@angular/core';
import {TextValidationDirective} from './text-validation.directive';
import {DigitOnlyDirective} from './digit-only.directive';

@NgModule({
    imports: [],
    declarations: [
        TextValidationDirective,
        DigitOnlyDirective
    ],
    exports: [
        TextValidationDirective,
        DigitOnlyDirective
    ]
})
export class DirectivesModule { }
