import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import Pages from '../model/pages';

import Page from '../pages/page/page';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page;

  constructor(public platform: Platform, public pages: Pages) {
    this.initializeApp();

    if (!this.pages.keys().length) {
      this.newPage();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(key: string) {
    this.nav.setRoot(Page, {'key': key});
  }

  newPage() {
    this.pages.new();
  }
}
