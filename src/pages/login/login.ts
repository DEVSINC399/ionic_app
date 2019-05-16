import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, ToastController } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public toastCtrl: ToastController, public postPvdr: PostProvider,
    public storage: Storage) {

  }

  ngOnInit(){
    this.storage.get("session-storage").then(res => {
      if(res != null){
        this.navCtrl.setRoot(MainscreenPage);
      }
    });
  }

  login(){
    if(this.username != '' && this.password != ''){
      let body = {
        username: this.username,
        password: this.password,
        mode: "login-request"
      };
      this.presentLoading();
      this.postPvdr.postData(body).subscribe(data => {
        var msg = data.msg;
        if(data.success){
          this.storage.set("session-storage", data.data);
          this.navCtrl.setRoot(MainscreenPage);
          msg = "Logged in successfully.";
        }
        this.presentToast(msg);
      }, error => {
        console.log(error);
      });
    }else{
      this.presentToast("Please fill the required fields.");
    }
    
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
