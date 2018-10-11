import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietDaysPage } from './diet-days';

@NgModule({
  declarations: [
    DietDaysPage,
  ],
  imports: [
    IonicPageModule.forChild(DietDaysPage),
  ],
})
export class DietDaysPageModule {}
