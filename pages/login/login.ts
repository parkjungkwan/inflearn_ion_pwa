import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from "../../pages/signup/signup";
import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private account: any = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loader: LoaderProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.loader.show();
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        let alert = this.alertCtrl.create({
          title : "Login Error",
          message: error.message
        });
        alert.present(); 
      });
    this.loader.hide();
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  resetEmail() {
    let alert = this.alertCtrl.create({
      title: 'Reset password',
      message: "패스워드를 재설정 링크를 받을 이메일 주소를 입력하여 주시기 바랍니다.",
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            var emailAddress = data.email;
            firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
              let alert = this.alertCtrl.create({
                title: 'Password Reset email',
                subTitle: '사용자가 입력한 이메일로 패스워드 재설정 메일이 전송되었습니다. 확인하요 주시기 바랍니다.',
                buttons: ['확인']
              });
              alert.present();
            }).catch((error) => {
            });
          }
        }
      ]
    });
    alert.present();
  }
}
