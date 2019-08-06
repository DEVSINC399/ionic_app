import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AdmissionformPage } from '../admissionform/admissionform';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the AdmissionformsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admissionforms',
  templateUrl: 'admissionforms.html',
})
export class AdmissionformsPage {

  id: string = '';
  students: any = [] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController, private toastCtrl: ToastController, 
    private postPvdr: PostProvider, private network: Network, private alertCtrl: AlertController) {
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.load();
    });
  }

  getAdmissionform(id){
    this.navCtrl.push(AdmissionformPage, {"student_id": id});
  }

  ionViewWillEnter(){
    // this.storage.get("session-storage").then( (res) => {
    //   this.id = res.id;
    //   this.load();
    // });
  }

  load(){
    let body = {
      id: this.id,
      mode: "students-listing"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.students = data.data;
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
