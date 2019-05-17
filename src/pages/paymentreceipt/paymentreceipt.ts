import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-paymentreceipt',
  templateUrl: 'paymentreceipt.html',
})
export class PaymentreceiptPage {

  month: string = '';
  id: string = '';
  receipt_detail: any = [];
  dates: any = [];
  months: string = '';
  months_array: any = [1, 3, 12, 2, 24, 4, 5, 6];
  months_sematics_array: any = ['Monthly', 'Quarterly', 'Two Months', 'Two Years', 'Four Months', 'Five Months', 'Half Yearly'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public postPvdr: PostProvider, public loadingCtrl: LoadingController, public storage: Storage, public toastCtrl: ToastController) {
  }

  ionViewWillEnter(){
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.month = this.navParams.get("month");
      this.load();
    });
  }

  load(){
    let body = {
      id: this.id,
      month: this.month,
      mode: "receipt-details"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.receipt_detail = data.data[0];
          this.months = this.months_array[this.receipt_detail['sponser_type'] - 1];
          this.dates = data.extras;
          console.log(data.data);
        }else{
          this.presentToast(msg);
        }
    });
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 3000
    });
    loader.present();
 }

 presentToast(msg: string){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
 }
}
