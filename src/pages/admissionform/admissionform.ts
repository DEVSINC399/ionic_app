import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdmissionformsPage } from '../admissionforms/admissionforms';

/**
 * Generated class for the AdmissionformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admissionform',
  templateUrl: 'admissionform.html',
})
export class AdmissionformPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getAdmissionform(){
    this.navCtrl.push(AdmissionformsPage);
  }

}
