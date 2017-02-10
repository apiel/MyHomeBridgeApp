import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import Page from '../pages/page/page';
import Confirm from '../pages/confirm/confirm';
import { PageSettings } from '../pages/pageSettings/pageSettings';
// import MqttService from '../lib/mqtt.service';
import Pages from '../model/pages';

@NgModule({
  declarations: [
    MyApp,
    Page,
    PageSettings,
    Confirm
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page,
    PageSettings,
    Confirm
  ],
  providers: [/*MqttService,*/ Pages, {provide: ErrorHandler, useClass: IonicErrorHandler}],
})
export class AppModule {
  constructor() { }
}
