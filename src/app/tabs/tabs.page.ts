import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from '../services/orderManager.service';
import { SplashscreenService } from '../services/splashscreen.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {


hidelable = 1;

constructor(public OrdersManager: OrderManagerService, public splash: SplashscreenService) {


}
ngOnInit() {

  timer(3000).subscribe(() => console.log('splash is enabled') );

}

LableAction(val: number) {
  this.hidelable = val;

}

disablesplash() {
  this.splash.ShowSplashscreen = false;

}


}
