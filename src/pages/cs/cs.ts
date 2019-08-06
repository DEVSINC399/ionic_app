import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/postprovider/postprovider';

/**
 * Generated class for the CsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cs',
  templateUrl: 'cs.html',
})
export class CsPage {
  name: string ='' ;
  subject: string= '';
  content: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public postPvdr: PostProvider, 
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }
  
  complaintsend(){
    if(this.subject != '' && this.content != ''){
      let body = {
        name: this.name,
        subject: this.subject,
        content: this.content,
        mode: 'complaint-store'
      };
      this.presentLoading();
      this.postPvdr.postData(body).subscribe( (data) => {
        var msg = data.msg;
          if(data.success){
            this.navCtrl.pop();
            this.presentToast("Thanks for your valuable feedback. We are looking forward towards it ! :)");
          }else{
            this.presentToast(msg);
          }
      },error => {
        if(error.status == 0)
          this.presentAlert('Unable to connect with server. Check your internet connection and try again!');
      });
    }
    else {
      this.presentToast("Pleasse fill the required fields!");
    }
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CsPage');
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
