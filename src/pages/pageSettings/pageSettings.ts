import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import PageSettingsModel from '../../model/pageSettings';

@Component({
  selector: 'page-pageSettings',
  templateUrl: 'pageSettings.html',
  providers: [PageSettingsModel]
})
export class PageSettings {
  inputChanged: boolean;
  options: PageSettingsModel;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public params: NavParams, public settings: PageSettingsModel) {
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
}
