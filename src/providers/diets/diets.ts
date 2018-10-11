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

  constructor(public http: HttpClient, private  databaseprovider: DatabaseProvider) {
    console.log('Hello DietsProvider Provider');
  }


  addDiet(name, duration, goal, start_date) {
    let data = [name, duration, goal, start_date]
    return this.databaseprovider.database.executeSql("INSERT INTO diets (name, duration, goal, start_date) VALUES (?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
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
    let data = [id];
    return this.databaseprovider.database.executeSql("DELETE FROM diets where id = ?", data).then(res => {console.log('Success: ', res);},err => {
      console.log('Error: ', err);
      return err;
    });
  }
}
