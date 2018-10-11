import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Diets } from '../pages/diets/diets';
import { MealsPage } from '../pages/meals/meals';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//storage
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule} from "@angular/http";
import {SQLite} from "@ionic-native/sqlite";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import { DatabaseProvider } from '../providers/database/database';


//translate
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DietsProvider } from '../providers/diets/diets';
import { DietDaysProvider } from '../providers/diet-days/diet-days';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Diets,
    MealsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Diets,
    MealsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    DietsProvider,
    DietDaysProvider
  ]
})
export class AppModule {}
