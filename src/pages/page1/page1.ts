import { Component } from '@angular/core';
import MqttService from '../../lib/mqtt.service';
import { NavController } from 'ionic-angular';

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
  providers: [MqttService]
})
export class Page1 {
  items: Item[] = [
    {name: "Light table", key: "item/garage/table/light", status: "off", values: ["on", "off"]},
    {name: "Floor heating on", key: "action/floorHeatingOn"},
    {name: "Thermostat", key: "item/garage/thermostat", status: 120, number: {min: 100, max: 200}},
    {name: "Store", key: "item/garage/roof/store", status: "open", values: ["open", "stop", "close"]},
    {name: "WC vmc", key: "item/garage/wc/vmc", status: "on", values: ["on", "off"]},
    {name: "Light Kitchen", key: "item/garage/kitchen/light", status: "on", values: ["on", "off"]}
  ];

  constructor(public navCtrl: NavController, private mqttService: MqttService) {
    this._loadConsumers();
  }  

  protected _loadConsumers() {
    for(let item of this.items) {
      if (item.status) {
        this.mqttService.subscribe(item.key, msg => item.status = msg);
      }
    }
  }

  call(item: any) {
    console.log(item);
    this.mqttService.mqtt.publish(item.key, item.status);
  }
}
