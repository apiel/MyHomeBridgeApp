import { Component } from '@angular/core';
import MqttService from '../../lib/mqtt.service';
import { NavController } from 'ionic-angular';
import { PageSettings } from '../pageSettings/pageSettings';
import PageSettingsModel from '../../model/pageSettings';

class Item{
  name: string; 
  key: string;
  status?: string|number; 
  values?: string[]; 
  number?: { min: number, max: number };
}

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  // providers: [MqttService, PageSettingsModel]
})
export class Page1 {
  pushPage: any = PageSettings;
  // options: PageSettingsModel = {
  //   name: 'Garage',
  //   uri: 'ws://127.0.0.1:3030',
  //   topicDefinition: 'hello'
  // };
  key: string = 'heloKeyOfPage';

  items: Item[] = [
    {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
    {name: "Floor heating on", key: "action/floorHeatingOn"},
    {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
    {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
    {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
    {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
  ];

  constructor(public navCtrl: NavController, private mqttService: MqttService, public settings: PageSettingsModel) {
    this._loadConsumers();
  }  

  protected _loadConsumers() {
    for(let item of this.items) {
      if (item.status) {
        this.mqttService.subscribe(item.key, msg => item.status = msg);
      }
    }
  }

  call(item: Item) {
    this.mqttService.mqtt.publish(item.key, item.status);
  }
}
