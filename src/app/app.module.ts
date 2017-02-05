import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { PageSettings } from '../pages/pageSettings/pageSettings';
import MqttService from '../lib/mqtt.service';
import PageSettingsModel from '../model/pageSettings';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    PageSettings
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    PageSettings
  ],
  providers: [MqttService, PageSettingsModel, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  constructor(private mqttService: MqttService) {}
}
