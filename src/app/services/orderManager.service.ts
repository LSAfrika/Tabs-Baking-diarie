import { OrdersInterface } from './../interfaces/orders.interface';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

 FilteredOrder: OrdersInterface;
 SavedOrders: OrdersInterface[] = [];
 KeyStore = 'savedorders';

  constructor(private OrdersStored: Storage) {

  }



  SaveOrder(order: OrdersInterface) {
    this.SavedOrders.push(order);
    this.OrdersStored.set(this.KeyStore, this.SavedOrders).then((savedresult) => {

      this.SavedOrders = savedresult;
    });

  }


  ViewOrder(date: Date) {
    this.FilteredOrder = this.SavedOrders.find(
      filterOrder => filterOrder.orderdate === date

    );

  }




}
