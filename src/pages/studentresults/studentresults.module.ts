import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentresultsPage } from './studentresults';

@NgModule({
  declarations: [
    StudentresultsPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentresultsPage),
  ],
})
export class StudentresultsPageModule {}
