import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  private categorys : any; 

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {

    this.getCategory();
  }

  getCategory(){
    var userRef = firebase.database().ref('categorys/');
    userRef.on('value', (items: any) => {
      this.categorys = [];
      if (items.val()) {
        items.forEach((item) => {
          this.categorys.push({
            title: item.val().title,
            code: item.val().code
          });
        });
      } else {
        console.log("no user data");
      }
    });
  }

  add() {
    let prompt = this.alertCtrl.create({
      title: '카테고리 정보 입력',
      message: "카테고리 정보를 입력하여 주세요.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'code',
          placeholder: 'code'
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '저장',
          handler: data => {
            var tmpCategory = {
              title: data.title,
              code: data.code
            };
            var updates = {};
            updates['/categorys/' + data.code] = tmpCategory;
            firebase.database().ref().update(updates);
          }
        }
      ]
    });
    prompt.present();
  }

  delete(item: ItemSliding,category){
    item.close(); 
    let confirm = this.alertCtrl.create({
      title: 'category 삭제?',
      message: category.title + ' 삭제하시겟습니까 ?',
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
           var deleteRef = firebase.database().ref("categorys/" + category.code); 
           deleteRef.remove(); 
          }
        }
      ]
    });
    confirm.present();
  }

  edit(item: ItemSliding,category){
    item.close(); 
    let prompt = this.alertCtrl.create({
      title: '카테고리 정보 입력',
      message: "카테고리 정보를 입력하여 주세요.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value : category.title
        },
        {
          name: 'code',
          placeholder: 'code',
          value : category.code
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '저장',
          handler: data => {
            var tmpCategory = {
              title: data.title,
              code: data.code
            };
            var updates = {};
            updates['/categorys/' + data.code] = tmpCategory;
            firebase.database().ref().update(updates);
          }
        }
      ]
    });
    prompt.present();
  }
}
