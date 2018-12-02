import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DashboardProvider} from "../../providers/dashboard/dashboard";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  current_meals =  [];

  constructor(public navCtrl: NavController, private dashboardprovider: DashboardProvider, public navParams: NavParams) {
    this.dashboardprovider.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDietsData();
      }
    })
  }


  loadDietsData() {
    this.dashboardprovider.getCurrentMeals().then(data => {
        this.current_meals = data;
    })
  }

}
