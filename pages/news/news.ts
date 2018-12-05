import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ItemSliding, AlertController } from 'ionic-angular';

import { NewsModalPage } from '../news-modal/news-modal';
import * as moment from 'moment';
import * as firebase from 'firebase';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  private newses: any;
  private mode: any;
  private limit: any = 10;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private iab: InAppBrowser, 
    private alertCtrl: AlertController,
    public navParams: NavParams) {

    this.initPage();
  }

  ckickNews(news){
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


  add() {
    this.mode = "add";
    let profileModal = this.modalCtrl.create(NewsModalPage, {
      mode: 'add',
      news: ''
    });
    profileModal.onDidDismiss(data => {
      console.log("modal data");
      console.log(data);
      this.updateNews(data);
    });
    profileModal.present();
  }

  edit(item: ItemSliding, news) {
    this.mode = "edit";
    item.close();
    let profileModal = this.modalCtrl.create(NewsModalPage, {
      mode: 'edit',
      news: news
    });
    profileModal.onDidDismiss(data => {
      console.log("modal data");
      console.log(data);
      this.updateNews(data);
    });
    profileModal.present();

  }

  delete(item: ItemSliding, news) {
    item.close();
    let confirm = this.alertCtrl.create({
      title: 'News 삭제?',
      message: news.title + ' 삭제하시겟습니까 ?',
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
            var deleteRef = firebase.database().ref("news/" + news.key);
            deleteRef.remove();
          }
        }
      ]
    });
    confirm.present();


  }

  updateNews(data) {
    if (this.mode === "add") {
      var key = firebase.database().ref().child('news/').push().key;
      let timeStemp = firebase.database.ServerValue.TIMESTAMP;
      console.log(timeStemp);
      var tmpNews = {
        title: data.title,
        category: data.category,
        source: data.source,
        webUrl: data.webUrl,
        date: moment().format("YYYY-MM-DD:HH:mm:SS"),
        clickCount: 0,
        key: key,
        timestemp: timeStemp
      };
      var updates = {};
      updates['/news/' + key] = tmpNews;
      firebase.database().ref().update(updates).then(() => {
        var stempRef = firebase.database().ref("news/" + key);
        var stemp: any;
        stempRef.once('value', (item: any) => {
          stemp = item.val().timestemp * -1
        }).then(() => {
          firebase.database().ref("news/" + key).update({
            timestemp: stemp
          })
        });
      })
    } else {
      tmpNews = {
        title: data.title,
        category: data.category,
        source: data.source,
        webUrl: data.webUrl,
        date: data.date,
        clickCount: data.clickCount,
        key: data.key,
        timestemp: data.timestemp,
      };
      updates = {};
      updates['/news/' + data.key] = tmpNews;
      firebase.database().ref().update(updates);
    }

  }
}
