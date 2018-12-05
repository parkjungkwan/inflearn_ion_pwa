import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoaderProvider } from '../../providers/loader/loader';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private account: any = {
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
    private loader: LoaderProvider,
    public navParams: NavParams) {
  }

  async signup() {
    this.loader.show();
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password);
      if (result) {
        console.log(result);

        var tmpUser = {
          name: this.account.name,
          email: this.account.email,
          password: this.account.password,
          date: moment().format('YYYY-MM-DD'),
          id: result.uid
        };
        // Get a key for a new Post.
        // var newPostKey = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/users/' + result.uid] = tmpUser;
        firebase.database().ref().update(updates);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
    this.loader.hide();
  }

  // signup() {
  //   this.loader.show();
  //   firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       var errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  //   this.loader.hide();
  // }
}
