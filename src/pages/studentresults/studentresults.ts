import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultPage } from '../result/result';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getResult(){
    this.navCtrl.push(ResultPage);
  }
 
}
