import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePage } from './welcome.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
