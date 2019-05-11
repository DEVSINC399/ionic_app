import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';

/**
 * Generated class for the PaymentreceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentreceipt',
  templateUrl: 'paymentreceipt.html',
})
export class PaymentreceiptPage {

  public donationtype = [
    { val: 'One Month', isChecked: true },
    { val: 'One Quarter', isDisabled: true },
    { val: 'One Year', isChecked: false },
    { val: 'Two Months', isChecked: false },
    { val: 'Two Years', isChecked: false },
    { val: 'Five Months', isChecked: false },
    { val: 'Half Monthly', isChecked: false }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoMainScreen(){
    this.navCtrl.setRoot(MainscreenPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentreceiptPage');
  }

}
