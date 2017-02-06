import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export default class {
  constructor(public navCtrl: NavController, public params: NavParams) { }
}
