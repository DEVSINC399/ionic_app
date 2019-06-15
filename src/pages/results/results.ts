import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { StudentresultsPage } from '../studentresults/studentresults';
import { Storage } from '@ionic/storage';
import { PostProvider } from '../../providers/postprovider/postprovider';



@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  id: string = '';
  result_years: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private postPvdr: PostProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
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
      mode: "results-listing"
    };
    this.presentLoading();
    this.postPvdr.postData(body).subscribe( (data) => {
      var msg = data.msg;
        if(data.success){
          this.result_years = data.data;
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


  getStudentResults(year: string){
    this.navCtrl.push(StudentresultsPage, {"year": year });
  }
}
