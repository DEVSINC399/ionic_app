import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DwrPage } from '../dwr/dwr';
import { SrPage } from '../sr/sr';
import { DrPage } from '../dr/dr';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { CsPage } from '../cs/cs';
import { MainscreenPage } from '../mainscreen/mainscreen';
import { PostProvider } from '../../providers/postprovider/postprovider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  logged_in: boolean = false;
  ad_to_show: boolean;
  ad: any;

  constructor(public navCtrl: NavController, private postPvdr: PostProvider, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
    let body = {
      mode: "ad-get"
    };
    this.postPvdr.postData(body).subscribe(data => {
      if(data.success){
        if(data.is_ad_exist > 0){
          this.ad = data['ad'];
          this.ad_to_show = true;
          this.openModal(this.ad);
        }
          
      }
    }, error => {
      console.log(error);
    });
  }

  openModal(data) {
    const modal = this.modalCtrl.create('ModalPage',{ data: data});
    
    modal.present();
  }

  getWasteRequest(){
    this.navCtrl.push(DwrPage);
  }
  getSponsershipsRequest(){
    this.navCtrl.push(SrPage);
  }
  getDonationsRequest(){
    this.navCtrl.push(DrPage);
  }
  getLoginDetails(){
    this.navCtrl.push(LoginPage);
  }
  getComplaintsSection(){
    this.navCtrl.push(CsPage);
  }
  getDashboardSection(){
    this.navCtrl.push(MainscreenPage);
  }

  ngOnInit(){
    this.storage.get("session-storage").then(res => {
      if(res){
        this.logged_in = true;
      }
    });
  }
}
