import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsModalPage } from './news-modal';

@NgModule({
  declarations: [
    NewsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsModalPage),
  ],
})
export class NewsModalPageModule {}
