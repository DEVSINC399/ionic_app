import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { Storage } from '@ionic/storage';
import { Area } from '../../models/area.model';
import { Currency } from '../../models/currency.model';


@IonicPage()
@Component({
  selector: 'page-sr',
  templateUrl: 'sr.html',
})
export class SrPage {
  donorname: string='';
  address: string='';
  cnic: string='';
  telno: string='';
  cellno: string='';
  email: string='';
  noofchild: string='';
  feeperchild: string='';
  area: string='';
  currency: string='';
  donationtype: string='';
  sponsertype: string='';
  paymentmethod: string='';
  selected_area: string = '';
  areas: Area[] = [];
  currencies: Currency[] = [];
  remarks: string = '';

  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private toastCtrl: ToastController,
      private loadingCtrl: LoadingController, private postPvdr: PostProvider, private alertCtrl: AlertController) {
  }

  sponsorshipRequest(){
    if(this.donorname!='' && this.address!='' && this.cnic!='' && (this.telno!='' || this.cellno!='') && this.email!=''
      && this.noofchild!='' && this.feeperchild!='' && this.area!='' && this.currency!='' &&
        this.donationtype!='' && this.sponsertype!='' && this.paymentmethod!=''){
        
        let body={
          donorname: this.donorname,
          address: this.address,
          cnic: this.cnic,
          telno: this.telno,
          cellno: this.cellno,
          email: this.email,
          noofchild: this.noofchild,
          feeperchild: this.feeperchild,
          area: this.area,
          currency: this.currency,
          donationtype: this.donationtype,
          sponsertype: this.sponsertype,
          paymentmethod: this.paymentmethod,
          remarks: this.remarks,
          mode: 'new-sponser-request'
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
      else{
        this.presentToast("Please enter the required fields");
      }
  }

  ionViewWillEnter(){
    this.load();
  }
  
  presentToast(msg: string){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
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

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content:'Loading...',
      duration:3000
    });
    loader.present();
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
