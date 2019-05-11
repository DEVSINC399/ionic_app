import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonthlyreceiptspaymentPage } from '../monthlyreceiptspayment/monthlyreceiptspayment';


@IonicPage()
@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})
export class ReceiptsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoMonthlyReceiptsPayment(){
    this.navCtrl.push(MonthlyreceiptspaymentPage);
  }


}
