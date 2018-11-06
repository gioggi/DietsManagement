import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class DietDaysProvider {



  constructor(public http: HttpClient, public  databaseprovider: DatabaseProvider) {
    console.log('Hello DietsProvider Provider');
  }

  getAllDietDays(diet_id) {
    if (diet_id ) {
      return this.databaseprovider.database.executeSql("SELECT * FROM diet_days where diet_id = " +parseInt(diet_id),[]).then((data) => {
        let diet_days = [];
        if (data.rows.length > 0) {

          for (var i = 0; i < data.rows.length; i++) {
            diet_days.push({ id: data.rows.item(i).id, w_day: data.rows.item(i).w_day, diet_id: data.rows.item(i).diet_id });
          }
        }
        return diet_days;
      }, err => {
        console.log('Error getAllDietDays: ', err.message);
        return [];
      });
    }
    else {
      return this.getLastDietId().then((id) => this.databaseprovider.database.executeSql("SELECT * FROM diet_days where diet_id = " +parseInt(id),[])).then((data) => {
        let diet_days = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            diet_days.push({ id: data.rows.item(i).id, w_day: data.rows.item(i).w_day, diet_id: data.rows.item(i).diet_id });
          }
        }
        return diet_days;
      }, err => {
        console.log('Error getAllDietDays: ', err.message);
        return [];
      });
    }

  }

  getLastDietId(){
    return this.databaseprovider.database.executeSql("SELECT * FROM diets ORDER BY id DESC LIMIT 1",[]).then((data) => {
      let diet ;
      diet =  data.rows.item(0).id
      console.log('Success getLastDietId: ', diet);
      return diet;
    }, err => {
      console.log('Error getLastDietId: ', err.message);
      return [];
    });
  }

}
