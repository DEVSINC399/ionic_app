import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrPage } from '../dr/dr';
import { DwrPage } from '../dwr/dwr';
import { SrPage } from '../sr/sr';
import { ResultsPage } from '../results/results';
import { ReceiptsPage } from '../receipts/receipts';
import { AdmissionformsPage } from '../admissionforms/admissionforms';

/**
 * Generated class for the MainscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainscreen',
  templateUrl: 'mainscreen.html',
})
export class MainscreenPage {

  tab1Root = ResultsPage;
  tab2Root = ReceiptsPage;
  tab3Root = AdmissionformsPage;

  constructor() {

  }

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MainscreenPage');
  // }

}
