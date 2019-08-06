import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { PaymentreceiptPage } from '../paymentreceipt/paymentreceipt';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';

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

  year: string = '';
  id: string = '';
  receipt_months: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController, private storage: Storage, private postPvdr: PostProvider, private alertCtrl: AlertController) {
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.year = this.navParams.get("year");
      this.load();
    }); 
  }

  ionViewWillEnter(){
    // this.storage.get("session-storage").then( (res) => {
    //   this.id = res.id;
    //   this.year = this.navParams.get("year");
    //   this.load();
    // });
  }

  load(){
    let body = {
      id: this.id,
      year: this.year,
      mode: "partially-receipts-listing"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.receipt_months = data.data;
        }else{
          this.presentToast(msg);
        }
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
    });
  }

  getPaymentReceipt(month: string){
    this.navCtrl.push(PaymentreceiptPage, { "month": month });
  }

  gotoMainScreen(){
    this.navCtrl.popToRoot();
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
 presentAlert(msg) {
  let alert = this.alertCtrl.create({
    title: 'WHOOPS!',
    message: msg,
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    
    ]
  });
  alert.present();
}
}
