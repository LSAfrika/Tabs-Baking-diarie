import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from '../services/orderManager.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {


hidelable = 1;

constructor(public OrdersManager: OrderManagerService){


}
ngOnInit() {


}

LableAction(val: number) {
  this.hidelable = val;

}



}
