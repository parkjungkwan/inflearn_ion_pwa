
import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular'; 


@Injectable()
export class LoaderProvider {

  private loading : any; 

  constructor(public loadingCtrl: LoadingController) {
  }

  show() {
    this.loading = this.loadingCtrl.create({
      content: '잠시만 기다려주세요...'
    });
    this.loading.present();
  }

  hide() {
    this.loading.dismiss();
  }

  

}
