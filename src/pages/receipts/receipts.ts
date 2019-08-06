import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { MonthlyreceiptspaymentPage } from '../monthlyreceiptspayment/monthlyreceiptspayment';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})
export class ReceiptsPage {

  receipt_years: any[] = [];
  id: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private postPvdr: PostProvider, private alertCtrl: AlertController,
    private storage: Storage, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.presentLoading();
  }

  ionViewWillEnter(){
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.load();
    });
  }

  load(){
    let body = {
      id: this.id,
      mode: "receipts-listing"
    };
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.receipt_years = data.data;
        }else{
          this.presentToast(msg);
        }
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
    });
  }

  gotoMonthlyReceiptsPayment(year: string){
    this.navCtrl.push(MonthlyreceiptspaymentPage, {year: year});
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
