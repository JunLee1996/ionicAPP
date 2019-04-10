import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MeComponent } from './me/me.component';
import { FindComponent } from './find/find.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'message',
        children: [
          {
            path: '',
            component: MessageComponent,
            outlet: 'message',
          }
        ]
      },
      {
        path: 'addressbook',
        children: [
          {
            path: '',
            component: AddressBookComponent,
            outlet: 'addressbook',
          }
        ]
      },
      {
        path: 'find',
        children: [
          {
            path: '',
            component: FindComponent,
            outlet: 'find',
          }
        ]
      },
      {
        path: 'me',
        children: [
          {
            path: '',
            component: MeComponent,
            outlet: 'me',
          }
        ]
      }, {
        path: '',
        redirectTo: 'message',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
