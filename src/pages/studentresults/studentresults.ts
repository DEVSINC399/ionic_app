import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';

/**
 * Generated class for the StudentresultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-studentresults',
  templateUrl: 'studentresults.html',
})
export class StudentresultsPage {

  id: string = '';
  year: string = '';
  students: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private postPvdr: PostProvider) {
  }

  ionViewWillEnter(){
    this.storage.get("session-storage").then( (res) => {
      this.id = res.id;
      this.year = this.navParams.get("year");
      this.load();
    });
  }

  load(){
    let body = {
      id: this.id,
      year: this.year,
      mode: "partially-results-listing"
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

  getResult(student_id: string){
    this.navCtrl.push(ResultPage, {"student_id": student_id, "year": this.year});
  }
 
}
