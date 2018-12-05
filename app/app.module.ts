import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from "../pages/login/login"; 
import { SignupPage } from "../pages/signup/signup";
import { LoaderProvider } from '../providers/loader/loader'; 

import { ManagerPage } from "../pages/manager/manager";
import { UserPage } from "../pages/user/user";
import { CategoryPage } from "../pages/category/category";
import { NewsPage } from "../pages/news/news";
import { NewsModalPage } from "../pages/news-modal/news-modal";

import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    NewsPage,
    UserPage,
    CategoryPage,
    ManagerPage,
    NewsModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    NewsPage,
    UserPage,
    CategoryPage,
    ManagerPage,
    NewsModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider,
    InAppBrowser
  ]
})
export class AppModule {}
