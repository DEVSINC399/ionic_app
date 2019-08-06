import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController,  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  ad: any = [];
  fullscreenPhoto: string = '';
  title: string = '';

  constructor(private viewCtrl: ViewController ,public navParams: NavParams) {
    this.ad = this.navParams.get('data');
    this.fullscreenPhoto = this.ad['image'];
    console.log(this.ad);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {

  }

}
