import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
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
  result_years: any = [] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private storage: Storage, private postPvdr: PostProvider,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

                this.storage.get("session-storage").then( (res) => {
                  this.id = res.id;
                  this.load();
                });         
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


  getStudentResults(year: string){
    this.navCtrl.push(StudentresultsPage, {"year": year });
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
