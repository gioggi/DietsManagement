import { MealsProvider } from "../../providers/meals/meals";
import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { MealOptionsPage } from "../meal-options/meal-options";

@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  meal = {};
  meals = [];
  diet_day_id =  this.navParams.get('diet_day_id');
  constructor(public navCtrl: NavController, private mealsprovider: MealsProvider, public navParams: NavParams) {
    this.mealsprovider.databaseprovider.getDatabaseState().subscribe(rdy => {

      if (rdy) {
        this.loadMealsData();
      }
    })
  }

  loadMealsData() {
    this.mealsprovider.getAllMeals(this.navParams.get('diet_day_id')).then(data => {
      this.meals = data;
    })
  }

  addMeal() {
    this.mealsprovider.addMeal(this.meal['name'], this.meal['start_time'], this.meal['end_time'],this.navParams.get('diet_day_id'))
      .then(data => {
        this.loadMealsData();
        this.navCtrl.push(MealOptionsPage, {meal_id: data});
      });
  }

  openPage(page) {
    this.navCtrl.push(page, {});
  }

  deleteMeal(id) {
    this.mealsprovider.deleteMeal(id);
    this.loadMealsData();
  }

  openMealOptions(id){
    this.navCtrl.push(MealOptionsPage, {meal_id: id});
  }

}
