import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { MeComponent } from './me/me.component';
import { MessageComponent } from './message/message.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { FindComponent } from './find/find.component';

@NgModule({
  declarations: [HomeComponent,MeComponent,MessageComponent,AddressBookComponent,FindComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    IonicModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule {

 }
