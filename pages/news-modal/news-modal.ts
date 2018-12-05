import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

import * as firebase from 'firebase'; 
import {LoaderProvider} from '../../providers/loader/loader'; 

@IonicPage()
@Component({
  selector: 'page-news-modal',
  templateUrl: 'news-modal.html',
})
export class NewsModalPage {

  private news = {
    title : '',
    category : '',
    webUrl : '',
    source : ''
  }

  private categorys : any; 

  constructor(public navCtrl: NavController, 
    private loader : LoaderProvider, 
    private viewCtrl: ViewController, 
    public navParams: NavParams) {

      var mode = this.navParams.get("mode"); 
      if(mode === "edit"){
        this.news = this.navParams.get("news"); 
      }

    this.getCategory(); 
  }

  async getCategory(){
    this.loader.show(); 
    try {
      var categoryRef = firebase.database().ref("categorys/");
      const items = await categoryRef.once("value"); 
      this.categorys = []; 
      if(items){
        items.forEach((item)=>{
          this.categorys.push({
            title : item.val().title,
            code : item.val().code
          }); 
        }); 
      }
    } catch(error){
      console.log(error.message); 
    }
    this.loader.hide(); 
  }

 
   cancel() {
     this.viewCtrl.dismiss();
   }

   save() {
     this.viewCtrl.dismiss(this.news); 
   }

}
