import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, ToastController, NavController, IonicModule, } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Subscription } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  sideMenuDisabled = true;
  backButtonPressed: boolean = false; //用于判断返回键是否触发
  customBackActionSubscription: Subscription;
  url;

  constructor(
    private platform: Platform,
    private router: Router,
    private appMinimize: AppMinimize,//可以最小化Android设备上的应用程序
    private  navController: NavController,//导航控制器
    private  toastCtrl: ToastController,

  ) {
    this.initRouterListen();
    this.platform.ready().then(() => {
      StatusBar.styleDefault();//管理本机状态栏的外观,styleDefault使用默认状态栏（深色文本，浅色背景）。
      SplashScreen.hide(); //显示和隐藏启动画面。
      this.registerBackButtonAction();//注册返回按键事件
      this.platform.resume.subscribe();//弹出框
    });
  }

  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
        if (this.backButtonPressed) {
          this.backButtonPressed = false;
          this.appMinimize.minimize();
        } else {
          alert('再按一次退出应用');
          this.backButtonPressed = true;
          setTimeout(() => this.backButtonPressed = false, 2000);
        }
    },);
  }
  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit() { }
  onLogin(){
    console.log("login");
    this.router.navigateByUrl('home');
  }
}
