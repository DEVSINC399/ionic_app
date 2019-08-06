import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Area } from '../../models/area.model';
import { Currency } from '../../models/currency.model';

@IonicPage()
@Component({
  selector: 'page-dr',
  templateUrl: 'dr.html',
})
export class DrPage {
  donorname: string='';
  address: string='';
  telno: string='';
  cellno: string='';
  amount: string='';
  donortype: string='';
  donationtype: string='';
  paymentmethod: string='';
  currency: string='';
  area: string='';
  areas: Area[] = [];
  currencies: Currency[] = [];
  remarks: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
        private loadingCtrl:LoadingController, private postPvdr: PostProvider, private alertCtrl: AlertController) {
  }

donationRequestSend(){
  if(this.donorname!= '' && this.address!= '' && (this.telno!= '' || this.cellno!= '') && this.amount!=''
     && this.donortype!='' && this.donationtype!='' && this.paymentmethod!='' && this.currency!='' && this.area!='' ){
    let body = {
      donorname: this.donorname,
      address: this.address,
      telno: this.telno,
      cellno: this.cellno,
      amount: this.amount,
      donortype: this.donortype,
      donationtype: this.donationtype,
      paymentmethod: this.paymentmethod,
      currency: this.currency,
      area: this.area,
      remarks: this.remarks,
      mode: 'new-donar-request'
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.presentToast("Request has been submitted successfully!");
          this.navCtrl.popToRoot();
        }else{
          console.log(msg);
          this.presentToast(msg);
        }
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
    });
  }
  else {
    this.presentToast("Pleasse enter the required fields");
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DrPage');
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

 
 ionViewWillEnter(){
  this.load();
}

load(){
  let body = {
    mode: "get-areas"
  };
  this.presentLoading();
  this.postPvdr.postData(body).subscribe( (data) => {
    var msg = data.msg;
      if(data.success){
        for(let area of data.data){
          this.areas.push({id: area.id, name: area.name});
        }
      }else{
        this.presentToast(msg);
      }
  },error => {
    if(error.status == 0)
      this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
  });
  
  body = {
    mode: "get-currencies"
  };
  this.postPvdr.postData(body).subscribe( (data) => {
    var msg = data.msg;
      if(data.success){
        console.log(data.data);
        for(let currency of data.data){
          this.currencies.push({id: currency.id, name: currency.name});
        }
      }else{
        this.presentToast(msg);
      }
  },error => {
    if(error.status == 0)
      this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
  });
  console.log(this.areas);
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
