import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {NewsPage} from '../news/news'; 
import { CategoryPage } from '../category/category'; 
import { UserPage } from '../user/user'; 


@IonicPage()
@Component({
  selector: 'page-manager',
  templateUrl: 'manager.html',
})
export class ManagerPage {

  private menus = [
    {
      code : '001',
      title : "News Database"
    }, 
    {
      code: '002',
      title: "User Database"
    }, 
    {
      code: '003',
      title: "Category Database"
    }, 
  ]; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerPage');
  }

  gotoMenu(menu){
    if(menu.code === "001"){
      this.navCtrl.push(NewsPage); 
    } else if(menu.code === "002"){
      this.navCtrl.push(UserPage); 
    } else {
      this.navCtrl.push(CategoryPage); 
    }
  }

}
