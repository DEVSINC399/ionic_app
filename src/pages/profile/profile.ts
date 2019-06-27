import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  id: string = '';
  user_data: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private postPvdr: PostProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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
      this.load();
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
