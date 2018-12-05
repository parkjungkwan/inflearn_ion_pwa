

import {ManagerPage} from '../manager/manager'; 

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ItemSliding, AlertController } from 'ionic-angular';

import { NewsModalPage } from '../news-modal/news-modal';
import * as moment from 'moment';
import * as firebase from 'firebase';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userName: any;
  private userEmail: any;
  private userId: any;

  private masterEmail: any = "newsonmanager@gmail.com";
  private masterSwitch: any;

  private userProfile = {
    name: '',
    email: '',
    password: '',
    date: '',
    id: ''
  }

  private newses: any;
  private mode: any;
  private limit: any = 10;
  
  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.masterSwitch = false;
    this.getUserProfile();
  }

  search() {
    let prompt = this.alertCtrl.create({
      title: 'Search',
      message: "News On Search",
      inputs: [
        {
          name: 'keyword',
          placeholder: 'keyword here....'
        },
      
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '검색',
          handler: data => {
            this.searchNews(data.keyword); 
          }
        }
      ]
    });
    prompt.present();
  }

  searchNews(keyword){

    var tmpNews = []; 
    var newsRef = firebase.database().ref("news/"); 
    newsRef.once('value',(items : any)=>{
      if(items.val()){  
        items.forEach((item)=>{
          tmpNews.push({
            title: item.val().title,
            category: item.val().category,
            source: item.val().source,
            webUrl: item.val().webUrl,
            date: item.val().date,
            clickCount: item.val().clickCount,
            key: item.val().key,
            timestemp: item.val().timestemp
          }); 
        }); 
      } else {
        console.log("no news data"); 
      }
    }).then(()=>{
      this.newses = []; 
      if (keyword && keyword.trim() != '') {
        this.newses = tmpNews.filter((news) => {
          return (news.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
        })
      }
    }).catch((error)=>{
      console.log(error.message); 
    }); 

   
  }

  gotoManagerPage() {
    this.navCtrl.push(ManagerPage); 
  }

  ckickNews(news) {
    const browser = this.iab.create(news.webUrl);
  }

  async initPage() {
    try {
      var newsRef = firebase.database().ref("news/").orderByChild('timestemp').limitToFirst(this.limit);
      const items = await newsRef.once("value");
      this.newses = [];
      if (items) {
        items.forEach((item) => {
          this.newses.push({
            title: item.val().title,
            category: item.val().category,
            source: item.val().source,
            webUrl: item.val().webUrl,
            date: item.val().date,
            clickCount: item.val().clickCount,
            key: item.val().key,
            timestemp: item.val().timestemp
          });;
        });
        console.log(this.newses.length);
      } else {
        console.log("no news data");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async doRefresh(refresher) {
    this.limit = 10;
    try {
      var newsRef = firebase.database().ref("news/").orderByChild('timestemp').limitToFirst(this.limit);
      const items = await newsRef.once("value");
      this.newses = [];
      if (items) {
        items.forEach((item) => {
          this.newses.push({
            title: item.val().title,
            category: item.val().category,
            source: item.val().source,
            webUrl: item.val().webUrl,
            date: item.val().date,
            clickCount: item.val().clickCount,
            key: item.val().key,
            timestemp: item.val().timestemp
          });
        });
        console.log("infinite");
        console.log(this.newses.length);
      } else {
        console.log("no news data");
      }
    } catch (error) {
      console.log(error.message);
    }

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  async doInfinite(infiniteScroll) {
    this.limit += 10;
    try {
      var newsRef = firebase.database().ref("news/").orderByChild('timestemp').limitToFirst(this.limit);
      const items = await newsRef.once("value");
      this.newses = [];
      if (items) {
        items.forEach((item) => {
          this.newses.push({
            title: item.val().title,
            category: item.val().category,
            source: item.val().source,
            webUrl: item.val().webUrl,
            date: item.val().date,
            clickCount: item.val().clickCount,
            key: item.val().key,
            timestemp: item.val().timestemp
          });
        });
        console.log("infinite");
        console.log(this.newses.length);
      } else {
        console.log("no news data");
      }
    } catch (error) {
      console.log(error.message);
    }
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  async getUserProfile() {
    try{
      const userId = await firebase.auth().currentUser.uid;
      if(userId){
        var userRef =firebase.database().ref("users/" + userId); 
        userRef.once('value',(item : any)=> {
          if(item.val()){
            this.userProfile = {
              name: item.val().name,
              email: item.val().email,
              password: item.val().password,
              date: item.val().date,
              id: item.val().id
            }
          } else {
            console.log("no data"); 
          }
        }).then(()=>{
          console.log(this.userProfile); 
          if (this.masterEmail === this.userProfile.email){
            this.masterSwitch = true;
          } else {
            this.masterSwitch = false;
          }
          this.initPage(); 
        }).catch((error)=>{
          console.log(error.message); 
        }); 
      }
    } catch(error){
      console.log(error.message); 
    }
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Log out ',
      message: 'log out 하시겠습니까 ?',
      buttons: [
        {
          text: '아니오',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '예',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log("log out");
            }).catch((error) => {
              console.log("log out errror");
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
