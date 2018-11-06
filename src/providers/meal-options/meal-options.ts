import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class MealOptionsProvider {

  constructor(public http: HttpClient, public  databaseprovider: DatabaseProvider) {
    console.log('Hello MealOptionsProvider Provider');
  }

  addMealOption(name, food, quantity, meal_id) {
    let data = [name, food, quantity, meal_id];
    return this.databaseprovider.database.executeSql("INSERT INTO meal_options (name, food, quantity, meal_id) VALUES (?, ?, ?, ?);", data).catch(
      (error) => {
        console.error("addMeal error", error.message);
      }
    );
  }

  getAllMealOptions(meal_id) {
    let data2 = [meal_id]
    return this.databaseprovider.database.executeSql("SELECT * FROM meal_options where meal_id = (?)", data2).then((data) => {
      let mealoptions = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          mealoptions.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, food: data.rows.item(i).food, quantity: data.rows.item(i).quanity});
        }
      }
      return mealoptions;
    }, err => {
      console.log('Error getAllMeals: ', err.message);
      return [];
    });
  }

  deleteMealOption(id) {
    let meal_option_id = [id];
    return this.databaseprovider.database.executeSql("DELETE FROM meal_options where id = ?",meal_option_id)
      .then(res => {console.log('Success deleteMeal: ', res.message);},err => {
        console.log('Error deleteMealOptions: ', err.message);
        return err;
      });
  }
}
