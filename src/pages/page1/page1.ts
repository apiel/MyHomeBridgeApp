import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  items: any = [
    {name: "Light table", status: "off", values: ["on", "off"]},
    {name: "Floor heating on"},
    {name: "Thermostat", status: 120, number: {min: 100, max: 200}},
    {name: "Store", status: "open", values: ["open", "stop", "close"]},
    {name: "WC vmc", status: "on", values: ["on", "off"]},
    {name: "Light Kitchen", status: "on", values: ["on", "off"]}
  ];

  constructor(public navCtrl: NavController) { }  

  call(item: any) {
    console.log(item);
  }
}
