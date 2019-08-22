import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from '../services/orderManager.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  


constructor(public OrdersManager: OrderManagerService){

 
}
ngOnInit() {

 // this.OrdersManager. LoadActiveSavedOrders();
 
 

}



}
