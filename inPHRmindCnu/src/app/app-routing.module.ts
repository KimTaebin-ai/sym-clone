import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PatternPeriodPage} from './page/main/mainTab/diary/pattern/pattern-period/pattern-period.page';

const routes: Routes = [
    {
        path: '',
        /*loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)*/
        loadChildren: () => import('./page/auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./page/auth/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'term',
        loadChildren: () => import('./page/auth/term/term.module').then(m => m.TermPageModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./page/main/main/main.module').then(m => m.MainPageModule)
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'side-menu',
        loadChildren: () => import('./page/modal/side-menu/side-menu.module').then(m => m.SideMenuPageModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./page/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
    },
    {
        path: 'lock',
        loadChildren: () => import('./page/common/lock/lock.module').then(m => m.LockPageModule)
    },
    {
        path: 'reg-completed',
        loadChildren: () => import('./page/auth/reg-completed/reg-completed.module').then(m => m.RegCompletedPageModule)
    },
    {
        path: 'diary-reg-modal',
        loadChildren: () => import('./page/modal/diary-reg-modal/diary-reg-modal.module').then(m => m.DiaryRegModalPageModule)
    },
    {
        path: 'term-modal',
        loadChildren: () => import('./page/modal/term-modal/term-modal.module').then(m => m.TermModalPageModule)
    },
    {
        path: 'ble',
        loadChildren: () => import('./ble/ble.module').then( m => m.BlePageModule)
    },
    {
        path: 'pattern-drinking',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-drinking/pattern-drinking.module').then(m => m.PatternDrinkingPageModule)
    },
    {
        path: 'pattern-smoking',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-smoking/pattern-smoking.module').then(m => m.PatternSmokingPageModule)
    },
    {
        path: 'pattern-caffeine',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-caffeine/pattern-caffeine.module').then(m => m.PatternCaffeinePageModule)
    },
    {
        path: 'pattern-meal',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-meal/pattern-meal.module').then(m => m.PatternMealPageModule)
    },
    {
        path: 'pattern-ex',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-ex/pattern-ex.module').then(m => m.PatternExPageModule)
    },
    {
        path: 'pattern-period',
        loadChildren: () => import('./page/main/mainTab/diary/pattern/pattern-period/pattern-period.module').then(m => m.PatternPeriodPageModule)
    },
    {
        path: 'panic-diary',
        loadChildren: () => import('./page/main/mainTab/diary/panic-diary/panic-diary.module').then(m => m.PanicDiaryPageModule)
    },
    {
        path: 'more-info',
        loadChildren: () => import('./page/auth/more-info/more-info.module').then(m => m.MoreInfoPageModule)
    },
    {
        path: 'more-info-modal',
        loadChildren: () => import('./page/modal/more-info-modal/more-info-modal.module').then(m => m.MoreInfoModalPageModule)
    },
    {
        path: 'psychological',
        loadChildren: () => import('./psychological/psychological.module').then( m => m.PsychologicalPageModule)
    },
    {
        path: 'symptom-info-modal',
        loadChildren: () => import('./page/modal/symptom-info-modal/symptom-info-modal.module').then(m => m.SymptomInfoModalPageModule)
    },
    {
        path: 'alarm',
        loadChildren: () => import('./page/main/common/alarm/alarm.module').then(m => m.AlarmPageModule)
    },
    {
        path: 'irb-agree',
        loadChildren: () => import('./page/auth/irb-agree/irb-agree.module').then(m => m.IrbAgreePageModule)
    },
    {
        path: 'setting',
        loadChildren: () => import('./page/setting/setting/setting.module').then(m => m.SettingPageModule)
    },
    {
        path: 'member-info',
        loadChildren: () => import('./page/setting/member-info/member-info.module').then(m => m.MemberInfoPageModule)
    },
    {
        path: 'care-management',
        loadChildren: () => import('./page/setting/care-management/care-management.module').then(m => m.CareManagementPageModule)
    },
    {
        path: 'irb',
        loadChildren: () => import('./page/setting/irb/irb.module').then(m => m.IRBPageModule)
    },
    {
        path: 'steps',
        loadChildren: () => import('./page/lifelogs/steps/steps.module').then(m => m.StepsPageModule)
    },
    {
        path: 'sleeps',
        loadChildren: () => import('./page/lifelogs/sleeps/sleeps.module').then(m => m.SleepsPageModule)
    },
    {
        path: 'pulses',
        loadChildren: () => import('./page/lifelogs/pulses/pulses.module').then(m => m.PulsesPageModule)
    },
    {
        path: 'insert-pulse',
        loadChildren: () => import('./page/lifelogs/insert-pulse/insert-pulse.module').then(m => m.InsertPulsePageModule)
    },
    {
        path: 'insert-step',
        loadChildren: () => import('./page/lifelogs/insert-step/insert-step.module').then(m => m.InsertStepPageModule)
    },
    {
        path: 'insert-sleep',
        loadChildren: () => import('./page/lifelogs/insert-sleep/insert-sleep.module').then(m => m.InsertSleepPageModule)
    },
    {
        path: 'insert-psychological-scale',
        loadChildren: () => import('./page/psychological-scale/insert-psychological-scale/insert-psychological-scale.module').then(m => m.InsertPsychologicalScalePageModule)
    },
    {
        path: 'scale-sub-list',
        loadChildren: () => import('./page/psychological-scale/scale-sub-list/scale-sub-list.module').then(m => m.ScaleSubListPageModule)
    },
    {
        path: 'device-connection',
        loadChildren: () => import('./page/device/device-connection/device-connection.module').then(m => m.DeviceConnectionPageModule)
    },
    {
        path: 'find-pw',
        loadChildren: () => import('./page/auth/find-pw/find-pw.module').then(m => m.FindPwPageModule)
    },
    {
        path: 'pattern-report',
        loadChildren: () => import('./page/mind-report/pattern-report/pattern-report.module').then(m => m.PatternReportPageModule)
    },
    {
        path: 'pw-change',
        loadChildren: () => import('./page/auth/pw-change/pw-change.module').then(m => m.PwChangePageModule)
    },
    {
        path: 'signature-modal',
        loadChildren: () => import('./page/modal/signature-modal/signature-modal.module').then(m => m.SignatureModalPageModule)
    },
    {
        path: 'loading',
        loadChildren: () => import('./page/common/loading/loading.module').then(m => m.LoadingPageModule)
    },
    {
        path: 'sns-sign-up',
        loadChildren: () => import('./page/auth/sns-sign-up/sns-sign-up.module').then(m => m.SnsSignUpPageModule)
    },
    {
        path: 'irb-agree-modal',
        loadChildren: () => import('./page/modal/irb-agree-modal/irb-agree-modal.module').then(m => m.IrbAgreeModalPageModule)
    },
    {
        path: 'platform-sign-up',
        loadChildren: () => import('./page/auth/platform-sign-up/platform-sign-up.module').then(m => m.PlatformSignUpPageModule)
    },
    {
        path: 'update-irb',
        loadChildren: () => import('./page/auth/update-irb/update-irb.module').then(m => m.UpdateIrbPageModule)
    },
    {
        path: 'dictionary-modal',
        loadChildren: () => import('./page/modal/dictionary-modal/dictionary-modal.module').then(m => m.DictionaryModalPageModule)
    },
    {
        path: 'emotion-info-modal',
        loadChildren: () => import('./page/modal/emotion-info-modal/emotion-info-modal.module').then(m => m.EmotionInfoModalPageModule)
    },
    {
        path: 'auto-login-modal',
        loadChildren: () => import('./page/modal/auto-login-modal/auto-login-modal.module').then(m => m.AutoLoginModalPageModule)
    },
  {
    path: 'setting-term',
    loadChildren: () => import('./page/setting/setting-term/setting-term.module').then(m => m.SettingTermPageModule)
  },

];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
