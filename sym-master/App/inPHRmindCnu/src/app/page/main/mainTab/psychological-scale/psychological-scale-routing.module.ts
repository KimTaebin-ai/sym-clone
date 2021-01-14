import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychologicalScalePage } from './psychological-scale.page';

const routes: Routes = [
    {
        path: '',
        component: PsychologicalScalePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PsychologicalScalePageRoutingModule {}
