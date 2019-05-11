import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmissionformPage } from './admissionform';

@NgModule({
  declarations: [
    AdmissionformPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmissionformPage),
  ],
})
export class AdmissionformPageModule {}
