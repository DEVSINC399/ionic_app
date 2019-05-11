import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdmissionformPage } from '../admissionform/admissionform';

/**
 * Generated class for the AdmissionformsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admissionforms',
  templateUrl: 'admissionforms.html',
})
export class AdmissionformsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getAdmissionform(){
    this.navCtrl.push(AdmissionformPage);
  }

}
