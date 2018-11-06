import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealOptionsPage } from './meal-options';

@NgModule({
  declarations: [
    MealOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealOptionsPage),
  ],
})
export class MealOptionsPageModule {}
