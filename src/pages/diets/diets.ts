import { DietsProvider } from '../../providers/diets/diets';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {MealsPage} from "../meals/meals";

@Component({
  selector: 'page-diets',
  templateUrl: 'diets.html'
})
export class Diets {

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
        this.openPage(MealsPage);
      });
    this.diet = {

    };
  }
  openPage(page) {
    this.navCtrl.push(page, {});
  }

  deleteDiet(id) {
    this.dietsprovider.deleteDiet(id);
    this.loadDietsData();
  }

  openMeals(id){
    this.navCtrl.push(MealsPage, {meals_id: id});
  }

}
