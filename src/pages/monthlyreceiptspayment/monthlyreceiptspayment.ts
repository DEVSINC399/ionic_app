import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentreceiptPage } from '../paymentreceipt/paymentreceipt';
import { MainscreenPage } from '../mainscreen/mainscreen';

/**
 * Generated class for the MonthlyreceiptspaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthlyreceiptspayment',
  templateUrl: 'monthlyreceiptspayment.html',
})
export class MonthlyreceiptspaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getPaymentReceipt(){
    this.navCtrl.push(PaymentreceiptPage);
  }
  // gotoMainScreen(){
  //   this.navCtrl.setRoot(MainscreenPage);
  // }
}
