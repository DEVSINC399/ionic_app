import { Component, ViewChild } from '@angular/core';
import {  Platform, NavController, MenuController, AlertController, ToastController, NavParams, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  profilePage = ProfilePage;
  @ViewChild('nav') nav: NavController;

 pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,   private menuCtrl: MenuController, 
     public app: App, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.show();
      splashScreen.hide();
    });
  }

  onLoad(page){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  setRoot(page){

  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Are you sure you want to Logout and clear user data?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.app.getRootNav().setRoot(HomePage);
            const toast = this.toastCtrl.create({
              message: 'Logout successfully!',
              duration: 3000
            });
            toast.present();
          }
        },
        
        {
          text: 'No',
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