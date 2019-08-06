import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  id: string = '';
  temp: any = [];
  pass: string = '';
  password: string = '';
  new_password: string = '';
  new_password_c: string = '';
  user_data: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController,
     private postPvdr: PostProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  gotoMainScreen(){
    this.navCtrl.setRoot(MainscreenPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  ionViewWillEnter(){
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.pass = res.password,
      this.load();
      console.log(res);
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
    });
  }

  load(){
    let body = {
      id: this.id,
      mode: "profile-get"
    };

    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.user_data = JSON.parse(data.data);
          this.temp = JSON.parse(data.data);
          console.log(this.user_data);
        }else{
          this.presentToast(msg);
        }
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
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

 update(){
   if(this.new_password == this.new_password_c){
     if(this.password == this.pass){
       this.update_call();
     } else {
      this.presentToast('Your current password seems incorrect!');  
     }
   } else {
     this.presentToast('New Password and Confirm Password doesn\'t match!');
   }
 }

 update_call(){
  let body = {
    id: this.id,
    donar_id: this.user_data['donar_id'],
    prev_email: this.temp['email'],
    new_email: this.user_data['email'],
    prev_address: this.temp['address'],
    new_address: this.user_data['address'],
    prev_cell_no: this.temp['cell_no'],
    new_cell_no: this.user_data['cell_no'],
    prev_phone_no: this.temp['phone_no'],
    new_phone_no: this.user_data['phone_no'],
    prev_password: this.pass,
    new_password: this.new_password,
    mode: "profile-update"
  };
  this.presentLoading();
  this.postPvdr.postData(body).subscribe( (data) => {
    var msg = data.msg;
      if(data.success){
        this.navCtrl.setRoot(MainscreenPage);
        this.presentToast(msg);
      }else{
        this.presentToast(msg);
      }
  },error => {
    if(error.status == 0)
      this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
  });
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
