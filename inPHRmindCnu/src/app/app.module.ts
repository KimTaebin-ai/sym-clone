import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Device} from '@ionic-native/device/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {MindModule} from './mind-module/mind.module';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import {Sensors} from '@ionic-native/sensors/ngx';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Toast} from '@ionic-native/toast/ngx';
import {MainHeaderComponent} from './page/common/main-header/main-header.component';
import {Facebook} from '@ionic-native/facebook/ngx';
import { NaverCordovaSDK } from 'naver-sdk/ngx';
import {BleManager} from './util/common/ble.manager';
import {BluetoothService} from './util/common/bluetooth.service';
import {BLE} from '@ionic-native/ble/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SignInWithApple} from '@ionic-native/sign-in-with-apple/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Health} from '@ionic-native/health/ngx';
import {HealthKit} from '@ionic-native/health-kit/ngx';
import {TokenInterceptorService} from './mind-module/http/token-interceptor.service';
@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule, IonicModule.forRoot(),
        AppRoutingModule,
        MindModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Device,
        FCM,
        DeviceMotion,
        AppVersion,
        Sensors,
        Toast,
        Facebook,
        BLE,
        InAppBrowser,
        BleManager,
        NaverCordovaSDK,
        BluetoothService,
        SignInWithApple,
        NativeStorage,
        Facebook,
        Health,
        HealthKit,
        Toast,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
