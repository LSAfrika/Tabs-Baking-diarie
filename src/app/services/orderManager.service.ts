import { OrdersInterface } from './../interfaces/orders.interface';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

 FilteredOrder: OrdersInterface;
 ActiveOrdersArray: OrdersInterface[] = [];
 ArchivedOrdersArray: OrdersInterface[] = [];
 ActiveStoreKey = 'savedorders';
 ArchivedStoreKey = 'archivedOrder';

  constructor(private storage: Storage) {
    this.LoadActiveSavedOrders();
    this.LoadArchivedSavedOrders();

  }

  LoadActiveSavedOrders() {
    this.storage.get(this.ActiveStoreKey).then((loadedOrders) => {

      this.ActiveOrdersArray = loadedOrders;

    }).catch(err =>
      console.log('logged an error:', err)
      );

  }
  LoadArchivedSavedOrders() {
    this.storage.get(this.ArchivedStoreKey).then((loadedOrders) => {

      this.ArchivedOrdersArray = loadedOrders;

    }).catch(err =>
      console.log('logged an error:', err)
      );

  }


// * LOGIC TO SAVE AN ORDER \\
  ActiveSaveOrder(order: OrdersInterface) {
    this.ActiveOrdersArray.push(order);
    this.ActiveOrdersStorage(this.ActiveOrdersArray);

  }


  // * VIEW ACTIVE ORDER ARRAY \\
 ActiveOrdersStorage(orders: OrdersInterface[]) {
  this.storage.set(this.ActiveStoreKey, orders).then((savedresult) => {

    this.ActiveOrdersArray = savedresult;
  });

}


// * VIEW ARCHIVE ORDER ARRAY \\
ArchiveOrdersStorage(orders: OrdersInterface[]) {
  this.storage.set(this.ArchivedStoreKey, orders).then((savedresult) => {

   this.ArchivedOrdersArray = savedresult;
  });

}


// * VIEW DETAILS OF A SPECIFIC ACTIVE ORDER  \\
  ViewActiveOrder(date: Date) {
    this.FilteredOrder = this.ActiveOrdersArray.find(
      filterOrder => filterOrder.orderdate === date

    );

  }

// * VIEW DETAILS OF A SPECIFIC ACTIVE ORDER   \\
  ViewArchivedOrder(date: Date) {
    this.FilteredOrder = this.ArchivedOrdersArray.find(
      filterOrder => filterOrder.orderdate === date

    );

  }

// * MOVE COMPLETED ORDER TO ARCHIVED ORDERS  \\
// * LOGIC TO POPULATE ARCHIVED ARRAY\\
  MoveCompletedOrder() {

    this.ArchivedOrdersArray.push(this.FilteredOrder);
    this.ArchiveOrdersStorage(this.ArchivedOrdersArray);


    const index = this.ActiveOrdersArray.indexOf( this.FilteredOrder);
    this.ActiveOrdersArray.splice(index, 1);
    this.ActiveOrdersStorage(this.ActiveOrdersArray);


  }






}
