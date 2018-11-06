import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
/*
  Generated class for the DietsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DietsProvider {

  constructor(public http: HttpClient, public  databaseprovider: DatabaseProvider) {
    console.log('Hello DietsProvider Provider');
  }

  addDiet(name, duration, goal, start_date) {
    let data = [name, duration, goal, start_date];
    return this.databaseprovider.database.executeSql("INSERT INTO diets (name, duration, goal, start_date) VALUES (?, ?, ?, ?);", data).then(
      () => {return  this.databaseprovider.database.executeSql('SELECT id FROM diets ORDER BY id DESC', []);}
    ).then(
      (resultSet) => {
        for(let i=0; i < 7; i++){
          let ff = [i,parseInt(resultSet.rows.item(0).id)];
          this.databaseprovider.database.executeSql("INSERT INTO diet_days (w_day, diet_id) VALUES (?, ?);", ff);
        }
      }).catch(
      (error) => {
        console.error("db error", error.message);
      }
    );
  }

  getAllDiets() {
    return this.databaseprovider.database.executeSql("SELECT * FROM diets", []).then((data) => {
      let diets = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          diets.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, duration: data.rows.item(i).duration, goal: data.rows.item(i).goal, start_date: data.rows.item(i).start_date });
        }
      }
      return diets;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  deleteDiet(id) {
    let diet_id = [id];
    this.databaseprovider.database.executeSql("DELETE FROM diets where id = ? ",diet_id);
    return this.databaseprovider.database.executeSql("DELETE FROM diet_days where diet_id = ?",diet_id)
      .then(res => {console.log('Success: ', res.message);},err => {
        console.log('Error deleteDiet: ', err.message);
        return err;
      });
  }
}
