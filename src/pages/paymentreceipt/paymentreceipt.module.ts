import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentreceiptPage } from './paymentreceipt';

@NgModule({
  declarations: [
    PaymentreceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentreceiptPage),
  ],
})
export class PaymentreceiptPageModule {}
