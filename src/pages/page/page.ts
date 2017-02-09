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

  // items: Item[] = [
  //   {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
  //   {name: "Floor heating on", key: "action/floorHeatingOn"},
  //   {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
  //   {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
  //   {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
  //   {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
  // ];

  // items: Item[] = [{"name":"Spot light chillarea","key":"garage/chill/light","values":["on","off"]},{"name":"Light little table","key":"garage/table/light","values":["on","off"]},{"name":"Gaz heating","key":"garage/gaz/heating","values":["on","off"]},{"name":"WC","key":"garage/wc","values":["on","off"]},{"name":"Spot light climbing wall","key":"garage/climbing-wall/light","values":["on","off"]},{"name":"Spot light kitchen","key":"garage/kitchen/light","values":["on","off"]},{"name":"Store","key":"garage/roof/store","values":["open","close"]},{"name":"Chill floor heating","key":"garage/chill/floor/heating","values":["on","off"]},{"name":"Living room floor heating zone 1","key":"garage/living-room/floor/heating/zone1","values":["on","off"]},{"name":"Living room floor heating zone 2","key":"garage/living-room/floor/heating/zone2","values":["on","off"]},{"name":"Sunlight","key":"sunlight","values":["daytime","nighttime"]},{"name":"Temperature","key":"temperature","number":{"min":-5,"max":40}},{"name":"Thermostat","key":"thermostat","number":{"min":0,"max":30}},{"name":"Heating","key":"heating","values":["on","off"]}];

  items: Item[] = [];

  constructor(public navCtrl: NavController, public params: NavParams, public pages: Pages /*, private mqttService: MqttService*/) {
    this.key = this.params.get('key');
    this.settings = this.pages.get(this.key);
    this.mqttService = new MqttService();
    this.connect();
  }

  connect = () => {
    if (this.settings.uri) {
      this.mqttService.init(this.settings.uri);
      this._loadItems();
    }
  }

  protected _loadItems() {
    if (this.settings.topicDefinition) {
      this.mqttService.subscribe(this.settings.topicDefinition, msg => {
        this.items = JSON.parse(msg);
        this._loadConsumers();
      });
    }
  }

  protected _loadConsumers() {
    for(let item of this.items) {
      if (item.values && !item.status) {
        item.status = '';
      }
      this.mqttService.subscribe(item.key, msg => item.status = msg);
    }
  }

  call(item: Item) {
    this.mqttService.mqtt.publish(item.key, item.status);
  }
}
