import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PostProvider } from '../providers/postprovider/postprovider';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DwrPage } from '../pages/dwr/dwr';
import { SrPage } from '../pages/sr/sr';
import { DrPage } from '../pages/dr/dr';
import { LoginPage } from '../pages/login/login';
import { MainscreenPage } from '../pages/mainscreen/mainscreen';
import { ProfilePage } from '../pages/profile/profile';
import { ResultsPage } from '../pages/results/results';
import { ReceiptsPage } from '../pages/receipts/receipts';
import { AdmissionformsPage } from '../pages/admissionforms/admissionforms';
import { MonthlyreceiptspaymentPage } from '../pages/monthlyreceiptspayment/monthlyreceiptspayment';
import { PaymentreceiptPage } from '../pages/paymentreceipt/paymentreceipt';
import { StudentresultsPage } from '../pages/studentresults/studentresults';
import { ResultPage } from '../pages/result/result';
import { AdmissionformPage } from '../pages/admissionform/admissionform';
import { CsPage } from '../pages/cs/cs';
import { ModalPage } from '../pages/modal/modal';
import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DwrPage,
    SrPage,
    DrPage,
    LoginPage, 
    MainscreenPage,
    ProfilePage,
    ResultsPage,
    ReceiptsPage,
    AdmissionformsPage,
    MonthlyreceiptspaymentPage,
    PaymentreceiptPage, 
    StudentresultsPage,
    ResultPage,
    AdmissionformPage, 
    CsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DwrPage,
    SrPage,
    DrPage,
    LoginPage,
    MainscreenPage, 
    ProfilePage,
    ResultsPage,
    ReceiptsPage,
    AdmissionformsPage,
    MonthlyreceiptspaymentPage, 
    PaymentreceiptPage, 
    StudentresultsPage,
    ResultPage, 
    AdmissionformPage, 
    CsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostProvider,
    Network
    
  ]
})
export class AppModule {}
