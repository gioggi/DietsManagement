import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DatabaseProvider} from '../database/database';

@Injectable()
export class DashboardProvider {


  constructor(public http: HttpClient, public  databaseprovider: DatabaseProvider) {
    console.log("Hello DashboardProvider Provider");
  }

  getCurrentMeals() {

      let datetime = new Date();
      return this.getDiets().then((data) => {
        const day = datetime.getDay();
        return this.getWday(data, this.numberToWeek(day)).then((ff) => {
          return this.getMeals(ff).then((data) => {
            return this.getMealsOptions(data).then( (data) => {
              console.log('-----------------------------------',data);
                return data ;
            }).catch(
              (error) => {
                console.error(" dashboardprovider getCurrentMeals error", error.message);
              });
          });
        });
      });


  }


  getDiets() {
    return this.databaseprovider.database.executeSql("SELECT * FROM diets LIMIT 1 ", []).then((data) => {
      let diet_id;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          diet_id = data.rows.item(i).id;
        }
      }
      return diet_id;
    }).then((data) => {
      return data
    });
  }

  getWday(diets, w_day) {
    const query_data = [diets,w_day];
    return this.databaseprovider.database.executeSql("SELECT * FROM diet_days WHERE diet_id = ? AND w_day = ? LIMIT 1 ", query_data).then((data) => {
      let w_day;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          w_day = data.rows.item(i).id;
        }
      }
      return w_day;
    }).then((data) => {
      return data
    });
  }



  getMeals(diet_day_id) {
    let date = new Date();
    let hour= date.getHours();
    let minutes= date.getMinutes();
    const query_data = [diet_day_id,hour,minutes,hour,minutes];
    console.log('hour', hour);
    console.log('minutes', minutes);
    return this.databaseprovider.database.executeSql("SELECT * FROM meals WHERE diet_day_id = ? AND ? >= start_hour AND ? >= start_minutes AND ? <= end_hour AND ? <= end_minutes  ", query_data).then((data) => {
      let getMeals = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          getMeals.push(data.rows.item(i).id);
        }
      }

      return getMeals;
    }).then((data) => {
      return data
    });
  }



  getMealsOptions(meals_ids) {
    let query = "SELECT * FROM meal_options WHERE meal_id IN ("+meals_ids+')';
    return this.databaseprovider.database.executeSql(query, []).then((data) => {
      let mealoptions = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          mealoptions.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, food: data.rows.item(i).food, quantity: data.rows.item(i).quantity});
        }
      }
      return mealoptions;
    }).then((data) => {
      return data
    });
  }

  numberToWeek(number){
    var weekday= new Array(7);
    weekday[0]=6;
    weekday[1]=0;
    weekday[2]=1;
    weekday[3]=2;
    weekday[4]=3;
    weekday[5]=4;
    weekday[6]=5;
    return weekday[number];
  }
}
