import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSlides, IonTabButton } from '@ionic/angular';
import { Router, RouterOutlet, ActivationStart } from '@angular/router';
import * as gradient from '../../assets/gradient'
import { toTypeScript } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttons: { type: string, color: boolean }[] = [];
  isChange: boolean = false;

  constructor(private router: Router) {
    let buttonText = ['message', 'addressbook', 'find', 'me'];
    buttonText.forEach(t => {
      this.buttons.push({ type: t, color: false });
    })
  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  slideOpts = {
    effect: 'flip',
    zoom:false,
    touchReleaseOnEdges: true,
  };

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonTabButton) ionTabButton: IonTabButton;
  ngOnInit() {
    let outlet_c: any = this.outlet
    this.buttons[0].color = true;
    this.router.events.subscribe(e => {// Fix Cannot activate an already activated outlet
      if (e instanceof ActivationStart && (this.buttons.findIndex(t => t.type == e.snapshot.outlet) >= 0))
        outlet_c.parentContexts.contexts.get(e.snapshot.outlet).outlet.deactivate();
    });
  }

  // ngDoCheck() {

  //  this.tt()
  // }

  onIonSlideDoubleTap(){
    return false;
  }
 
  onIonSlideTouchEnd(value) {
    let transform = document.getElementsByClassName('swiper-wrapper')[0].getAttribute('style');
    let start = transform.indexOf('translate3d') + 12;
    let end = transform.indexOf(',') - 2;
    let slideValue = Math.abs(+transform.substring(start, end))
    if (value) {
      this.isChange = slideValue > value;
      this.disposeTransform();
      return;
    }
    setTimeout(() => {
      this.onIonSlideTouchEnd(slideValue);
    }, 1)
  }
  disposeTransform() {//根据transform改变button的颜色
    let transform = document.getElementsByClassName('swiper-wrapper')[0].getAttribute('style');
    let start = transform.indexOf('translate3d') + 12;
    let end = transform.indexOf(',') - 2;
    let slideValue = transform.substring(start, end)
    let style = document.getElementsByClassName('swiper-slide')[0].getAttribute('style')
    let width = style.substring(style.indexOf('width') + 7, style.indexOf('px'));
    let index = Math.abs(+slideValue) / (+width);
    index = parseInt(index + '');
    let degree = Math.abs(+slideValue) % (+width)
    let oldCurrentButton = document.getElementsByTagName('ion-tab-button')[index]
    let oldNextButton = document.getElementsByTagName('ion-tab-button')[index + 1]
    //let current = 0;
    this.router.navigate(['home', this.buttons[index].type]);
    let next = 0;
    if (this.isChange) {
      if (index > 3 || index <= 0) {
        return
      }
      let oldCurrentButton = document.getElementsByTagName('ion-tab-button')[index - 1]
      let oldNextButton = document.getElementsByTagName('ion-tab-button')[index]
      this.RecursiveAssignment(oldCurrentButton, oldNextButton, 0)
    } else {
      if (index >= 3 || index < 0) {
        return
      }
      let oldCurrentButton = document.getElementsByTagName('ion-tab-button')[index]
      let oldNextButton = document.getElementsByTagName('ion-tab-button')[index + 1]
      this.RecursiveAssignment(oldNextButton, oldCurrentButton, 0)
    }
    // gradient.getColorlist()
    // setTimeout((index, color) => {
    //   document.getElementsByTagName('ion-tab-button')[index].style.color = color
    // }, 100)

  }
  RecursiveAssignment(p1, p2, p3) {
    if (p3 < 100) {
      setTimeout(() => {
        p1.style.color = gradient.getColor(gradient.hexToRbg(p1.style.color), '#666666', 100, p3);
        p2.style.color = gradient.getColor(gradient.hexToRbg(p2.style.color), '#4185fa', 100, p3);
      }, 1);
      p3++;
      this.RecursiveAssignment(p1, p2, p3);
    } else {
      return
    }
  }
  onionSlideDrag() {
    console.log("666")
    if (document.getElementsByClassName('swiper-wrapper')[0]) {
      let transform = document.getElementsByClassName('swiper-wrapper')[0].getAttribute('style');
      let start = transform.indexOf('translate3d') + 12;
      let end = transform.indexOf(',') - 2;
      let slideValue = transform.substring(start, end)
      let style = document.getElementsByClassName('swiper-slide')[0].getAttribute('style')
      let width = style.substring(style.indexOf('width') + 7, style.indexOf('px'));
      let index = Math.abs(+slideValue) / (+width);
      index = parseInt(index + '');
      let degree = parseInt(Math.abs(+slideValue) % (+width) + '')
      let current = 0;
      let next = 0;
      if (index < Math.abs(+slideValue) / (+width)) {
        current = index;
        next = index + 1;
      } else if (index > Math.abs(+slideValue) / (+width)) {
        current = index;
        next = index - 1;
      } else {
        return
      }
      document.getElementsByTagName('ion-tab-button')[current].style.color
        = gradient.getColor('#4185fa', '#666666', +width, degree)
      document.getElementsByTagName('ion-tab-button')[next].style.color =
        gradient.getColor('#666666', '#4185fa', +width, degree)

    }
  }

  onClick(url) {
    this.slides.slideTo(this.buttons.findIndex(b => b.type === url));
    this.router.navigate(['home', url]);
    let index = 0;
    this.buttons.forEach(b => {
      if (b.type === url) {
        document.getElementsByTagName('ion-tab-button')[index].style.color = '#4185fa'
        b.color = true;
      } else {
        document.getElementsByTagName('ion-tab-button')[index].style.color = '#666666'
        b.color = false;
      }
      index++
    })
  }

  tr() {
    console.log("55656");
  }
  // onIonSlidePrevEnd() {
  // let transform = document.getElementsByClassName('swiper-wrapper')[0].getAttribute('style');
  //   let start = transform.indexOf('translate3d') + 12;
  //   let end = transform.indexOf(',') - 2;
  //   let slideValue = transform.substring(start, end)
  //   let style = document.getElementsByClassName('swiper-slide')[0].getAttribute('style')
  //   let width = style.substring(style.indexOf('width') + 7, style.indexOf('px'));
  //   let index = Math.abs(+slideValue) / (+width);
  //   index = parseInt(index + '');
  //     this.router.navigate(['home', this.buttons[r].type]);
  //   })
  // }
}
