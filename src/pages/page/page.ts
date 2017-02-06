import { Component } from '@angular/core';
import MqttService from '../../lib/mqtt.service';
import { NavController, NavParams } from 'ionic-angular';
import { PageSettings } from '../pageSettings/pageSettings';
import PageSettingsModel from '../../model/pageSettings';
import Pages from '../../model/pages';

class Item{
  name: string; 
  key: string;
  status?: string|number; 
  values?: string[]; 
  number?: { min: number, max: number };
}

@Component({
  selector: 'page-page',
  templateUrl: 'page.html',
  // providers: [MqttService, PageSettingsModel]
})
export default class {
  mqttService: MqttService;
  pushPage: any = PageSettings;
  settings: PageSettingsModel;
  key: string;

  items: Item[] = [
    {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
    {name: "Floor heating on", key: "action/floorHeatingOn"},
    {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
    {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
    {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
    {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
  ];

  constructor(public navCtrl: NavController, public params: NavParams, public pages: Pages /*, private mqttService: MqttService*/) {
    this.key = this.params.get('key');
    this.settings = this.pages.get(this.key);
    this._connect();
  }

  protected _connect() {
    this.mqttService = new MqttService();
    if (this.settings.uri) {
      this.mqttService.init(this.settings.uri);
      this._loadConsumers();
    }
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
