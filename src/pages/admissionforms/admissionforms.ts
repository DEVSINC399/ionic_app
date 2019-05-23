import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AdmissionformPage } from '../admissionform/admissionform';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';

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
  students: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private postPvdr: PostProvider) {
  }

  getAdmissionform(){
    this.navCtrl.push(AdmissionformPage);
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
