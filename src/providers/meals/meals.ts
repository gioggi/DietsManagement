import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class MealsProvider {

  constructor(public http: HttpClient, public  databaseprovider: DatabaseProvider) {
    console.log('Hello MealsProvider Provider');
  }

  addMeal(name, start_time, end_time, diet_day_id) {
    let data = [name, start_time, end_time, diet_day_id];
    return this.databaseprovider.database.executeSql("INSERT INTO meals (name, start_time, end_time, diet_day_id) VALUES (?, ?, ?, ?);", data).then(
      () => {return  this.databaseprovider.database.executeSql('SELECT id FROM meals ORDER BY id DESC', []);}
    ).then(
      (resultSet) => {
          let meal_id = [0,parseInt(resultSet.rows.item(0).id)];
          this.databaseprovider.database.executeSql("INSERT INTO meal_options (meal_id) VALUES (?);", meal_id);
      }).catch(
      (error) => {
        console.error("addMeal error", error.message);
      }
    );
  }

  getAllMeals(diet_day_id) {
    let data2 = [diet_day_id]
    return this.databaseprovider.database.executeSql("SELECT * FROM meals where diet_day_id = (?)", data2).then((data) => {
      let meals = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          meals.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, start_time: data.rows.item(i).duration, end_time: data.rows.item(i).goal, diet_day_id: data.rows.item(i).diet_day_id});
        }
      }
      return meals;
    }, err => {
      console.log('Error getAllMeals: ', err.message);
      return [];
    });
  }

  deleteMeal(id) {
    let meal_id = [id];
    this.databaseprovider.database.executeSql("DELETE FROM meals where id = ? ",meal_id);
    return this.databaseprovider.database.executeSql("DELETE FROM meal_options where meal_id = ?",meal_id)
      .then(res => {console.log('Success deleteMeal: ', res.message);},err => {
        console.log('Error deleteMeal: ', err.message);
        return err;
      });
  }
}
