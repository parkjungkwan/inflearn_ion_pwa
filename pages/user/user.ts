import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase'; 

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  private users : any; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initPage(); 
  }

  initPage(){
    var userRef = firebase.database().ref('users/');
    userRef.on('value',(items : any)=> {
      this.users = []; 
      if(items.val()){
        items.forEach((item)=>{
          this.users.push({
            name: item.val().name,
            email: item.val().email,
            password: item.val().password,
            date: item.val().date,
            id: item.val().id
          }); 
        }); 
      } else {
        console.log("no user data"); 
      }
    });
  }
}
