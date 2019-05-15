import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DwrPage } from '../dwr/dwr';
import { SrPage } from '../sr/sr';
import { DrPage } from '../dr/dr';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logged_in: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.storage.get("session-storage").then(res => {
      if(res){
        this.logged_in = true;
      }
    });
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
