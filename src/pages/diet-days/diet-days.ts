import { Component } from '@angular/core';
import {IonicPage, NavController, Platform, NavParams} from 'ionic-angular';
import {MealsPage} from "../meals/meals";
import {DietDaysProvider} from "../../providers/diet-days/diet-days";

@IonicPage()
@Component({
  selector: 'page-diet-days',
  templateUrl: 'diet-days.html'
})
export class DietDaysPage {
  dietdays = [];

  constructor(public navCtrl: NavController, public  navParams: NavParams, private dietdaysprovider: DietDaysProvider, private platform: Platform) {
    this.dietdaysprovider.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.ionViewDidLoad();
      }
    })

  }

  ionViewDidLoad() {
    let diet_id;
    diet_id = this.navParams.get('diet_id');
    this.dietdaysprovider.getAllDietDays(diet_id).then(data => {
      this.dietdays = data;
    })
  }

  numberToWeek(number){
    var weekday= new Array(7);
    weekday[0]="Monday";
    weekday[1]="Tuesday";
    weekday[2]="Wednesday";
    weekday[3]="Thursday";
    weekday[3]="Thursday";
    weekday[4]="Friday";
    weekday[5]="Saturday";
    weekday[6]="Sunday";
    return weekday[number];
  }

  openMeals(id){
    this.navCtrl.push(MealsPage, {diet_day_id: id});
  }
}
