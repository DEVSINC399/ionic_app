import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  id: string = '';
  student_id: string = '';
  year: string = '';
  results: any = [];
  extras: any = [];
  subject_results: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private postPvdr: PostProvider) {
  }

  ionViewWillEnter(){
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.year = this.navParams.get("year");
      this.student_id = this.navParams.get("student_id");
      this.load();
    });
  }

  load(){
    let body = {
      id: this.id,
      year: this.year,
      student_id: this.student_id,
      mode: "result-details"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.results = data.data[0];
          this.extras = data.extras;
          this.subject_results = data.subject_results;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

}
