import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, ToastController } from 'ionic-angular';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // loading: Loading;
  // loginCredentials = {email: '', password: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public auth:AuthServiceProvider, 
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  // public login(){
  //   this.showLoading()
  //   this.auth.login(this.loginCredentials).subsribe(allowed =>{
  //     if(allowed){
  //       this.navCtrl.setRoot(MainscreenPage);
  //     }else{
  //       const toast = this.toastCtrl.create({
  //         message: 'Fill the required fields first!',
  //         duration: 3000
  //       });
  //       toast.present();
  //     }
  //   // },
  //   //  error =>{
  //   //    this.showError(error);
  //    });
  // }

  // showError(text) {
  //   this.loading.dismiss();
 
  //  let alert= this.alertCtrl.create({
  //   title: 'Fail',
  //   subTitle: text,
  //   buttons:['OK']
  //  });
  //  alert.present(prompt);
  // }

  gotoMainScreen(){
    this.navCtrl.setRoot(MainscreenPage);
   
   }
  // showLoading(){
  //   this.loading = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     dismissOnPageChange: true
  //   });
    // loader.present();
    //  this.loading.present();
  // }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

}
