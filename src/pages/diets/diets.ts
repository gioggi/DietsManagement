import { DietsProvider } from '../../providers/diets/diets';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {DietDaysPage} from "../diet-days/diet-days";

@Component({
  selector: 'page-diets',
  templateUrl: 'diets.html'
})
export class DietsPage {

  diet = {};
  diets = [];

  constructor(public navCtrl: NavController, private dietsprovider: DietsProvider, private platform: Platform) {
    this.dietsprovider.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDietsData();
      }
    })
  }

  loadDietsData() {
    this.dietsprovider.getAllDiets().then(data => {
      this.diets = data;
    })
  }

  addDiet() {
    this.dietsprovider.addDiet(this.diet['name'], parseInt(this.diet['duration']), this.diet['goal'], this.diet['start_date'])
      .then(data => {
         this.loadDietsData();
         this.navCtrl.push(DietDaysPage, {diet_id: this.diet['id']});
      });
  }
  openPage(page) {
    this.navCtrl.push(page, {});
  }

  deleteDiet(id) {
    this.dietsprovider.deleteDiet(id);
    this.loadDietsData();
  }

  openDietDays(id){
    this.navCtrl.push(DietDaysPage, {diet_id: id});
  }

}


