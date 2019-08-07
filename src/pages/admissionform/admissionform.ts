import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AdmissionformsPage } from '../admissionforms/admissionforms';
import { PostProvider } from '../../providers/postprovider/postprovider';


@IonicPage()
@Component({
  selector: 'page-admissionform',
  templateUrl: 'admissionform.html',
})
export class AdmissionformPage {

  student_id: string = '';
  student_detail = [];
  extras = [];
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: 
    LoadingController, private postPvdr: PostProvider, public toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.student_id = this.navParams.get("student_id");
    this.load();
  }

  load(){
    let body = {
      student_id: this.student_id,
      mode: "admission-details"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.student_detail = data.data;
          this.extras = data.extras;
          console.log(data);
        }else{
          this.presentToast(msg);
        }
    },error => {
      if(error.status == 0)
        this.presentAlert('Unable to connect with server. Check your Internet Connection and try again!');
    });
  }

  getAdmissionform(){
    this.navCtrl.push(AdmissionformsPage);
  }

  segmentChanged(ev : any){
    console.log('Segment changed', ev);
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

  gotoMainScreen(){
    this.navCtrl.popToRoot();
  }

  presentAlert(msg: string){
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
