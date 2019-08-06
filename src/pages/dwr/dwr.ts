import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Area } from '../../models/area.model';


@IonicPage()
@Component({
  selector: 'page-dwr',
  templateUrl: 'dwr.html',
})
export class DwrPage {
  donorname: string='';
  address: string='';
  telno: string='';
  cellno: string='';
  area: string='';
  remarks: string='';
  areas: Area[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private postPvdr: PostProvider, 
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  dwRequestSend(){
    if(this.donorname!= '' && this.address!= '' && this.telno!= '' && this.cellno!= ''  && this.area!='' && this.remarks!= ''){
      let body = {
        donorname: this.donorname,
        address: this.address,
        telno: this.telno,
        cellno: this.cellno,
        area: this.area,
        remarks: this.remarks,
        mode: 'new-sw-request'
      };
      
      this.presentLoading();
        this.postPvdr.postData(body).subscribe( (data) => {
          var msg = data.msg;
            if(data.success){
              this.presentToast("Request has been submitted successfully!");
              this.navCtrl.popToRoot();
            }else{
              //  console.log(msg);
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
    console.log('ionViewDidLoad DwrPage');
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
    console.log(this.areas);
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
