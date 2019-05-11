import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DwrPage } from '../dwr/dwr';
import { SrPage } from '../sr/sr';
import { DrPage } from '../dr/dr';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }
  getWasteRequest(){
    this.navCtrl.push(DwrPage);
  }
  getSponsershipsRequest(){
    this.navCtrl.push(SrPage);
  }
  getDonationsRequest(){
    this.navCtrl.push(DrPage);
  }
  getLoginDetails(){
    this.navCtrl.push(LoginPage);
  }
}
