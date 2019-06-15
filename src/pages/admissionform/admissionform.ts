import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AdmissionformsPage } from '../admissionforms/admissionforms';
import { PostProvider } from '../../providers/postprovider/postprovider';


@IonicPage()
@Component({
  selector: 'page-admissionform',
  templateUrl: 'admissionform.html',
})
export class AdmissionformPage {

  student_name: string = '';
  student_detail = [];
  //default selected segment--> information: string = "student";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private postPvdr: PostProvider, public toastCtrl: ToastController) {
  }

  ionViewWillEnter(){
    this.student_name = this.navParams.get("student_name");
    this.load();
  }

  load(){
    let body = {
      student_name: this.student_name,
      mode: "admission-details"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.student_detail = data.data;
        }else{
          this.presentToast(msg);
        }
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

}
