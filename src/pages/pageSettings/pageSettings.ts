import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import PageSettingsModel from '../../model/pageSettings';
import Pages from '../../model/pages';

@Component({
  selector: 'page-pageSettings',
  templateUrl: 'pageSettings.html',
  // providers: [PageSettingsModel]
})
export class PageSettings {
  inputChanged: boolean;
  settings: PageSettingsModel;
  options: PageSettingsModel;
  key: string;

  constructor(public navCtrl: NavController, public params: NavParams, public pages: Pages) {
    this.key = this.params.get('key');
    this.settings = this.params.get('settings');
    // this.settings = this.params.data;
    this.loadOptions();  
  }

  loadOptions() {
    this.options = Object.assign({}, this.settings);
  }

  onInputChange() {
    this.inputChanged = true;
  }

  onCancel() {
    this.loadOptions();
    this.inputChanged = false;
  }

  onSave() {
    this.settings.save(this.options);
    this.inputChanged = false;
  }

  onDelete() {
    console.log('delete');
    // this.pages.delete(this.key);
  }
}
