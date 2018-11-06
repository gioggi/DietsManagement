import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {MealOptionsProvider} from "../../providers/meal-options/meal-options";

@Component({
  selector: 'page-meal-options',
  templateUrl: 'meal-options.html'
})
export class MealOptionsPage {

  mealoption = {};
  mealoptions = [];
  diet_day_id =  this.navParams.get('diet_day_id');
  constructor(public navCtrl: NavController, private mealoptionsprovider: MealOptionsProvider, public navParams: NavParams) {
    this.mealoptionsprovider.databaseprovider.getDatabaseState().subscribe(rdy => {

      if (rdy) {
        this.loadMealOptionsData();
      }
    })
  }

  loadMealOptionsData() {
    this.mealoptionsprovider.getAllMealOptions(this.navParams.get('meal_id')).then(data => {
      this.mealoptions = data;
    })
  }

  addMealOption() {
    this.mealoptionsprovider.addMealOption(this.mealoption['name'], this.mealoption['food'], parseInt(this.mealoption['quantity']),this.navParams.get('meal_id'))
      .then(data => {
        this.loadMealOptionsData();
      });
  }

  openPage(page) {
    this.navCtrl.push(page, {});
  }

  deleteMealOption(id) {
    this.mealoptionsprovider.deleteMealOption(id);
    this.loadMealOptionsData();
  }



}
