import { OrdersInterface } from './../interfaces/orders.interface';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ELEMENT_MARKER } from '@angular/core/src/render3/interfaces/i18n';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

 FilteredOrder: OrdersInterface;
 ActiveOrdersArray: OrdersInterface[] = [];
 ArchivedOrdersArray: OrdersInterface[] = [];
 ActiveStoreKey = 'savedorders';
 ArchivedStoreKey = 'archivedOrder';
 activecounter = 0;
 isEditable =false;

  constructor(private storage: Storage, private router: Router) {
    this.LoadActiveSavedOrders();
    this.LoadArchivedSavedOrders();

  }

  LoadActiveSavedOrders() {
    this.storage.get(this.ActiveStoreKey).then((loadedOrders) => {

      if (loadedOrders) {
        this.ActiveOrdersArray = loadedOrders;
        this.activecounter = this.ActiveOrdersArray.length;
        console.log('active array filled: ', this.ActiveOrdersArray);
      } else {
        this.ActiveOrdersArray = [];
        console.log('active array empty: ', this.ActiveOrdersArray);

      }

    }).catch(err =>
      console.log('logged an error:', err)
      );

  }
  LoadArchivedSavedOrders() {
    this.storage.get(this.ArchivedStoreKey).then((loadedOrders) => {

      if (loadedOrders) {
      this.ArchivedOrdersArray = loadedOrders;
      } else {
        this.ArchivedOrdersArray = [];

      }

    }).catch(err =>
      console.log('logged an error:', err)
      );

  }


// * LOGIC TO SAVE AN ORDER \\
  SaveOrder(order) {
    console.log('order service value: ', order);
    this.ActiveOrdersArray.push(order);
    this.ActiveOrdersStorage(this.ActiveOrdersArray);

  }

  // * LOGIC TO UPDATE AN ORDER \\
  updateOrder(order) {
    const index = this.ActiveOrdersArray.indexOf(this.FilteredOrder);
    this.ActiveOrdersArray.splice(index, 1, order);
    this.ActiveOrdersStorage(this.ActiveOrdersArray);

  }

   // * LOGIC TO DELETE AN ORDER \\
   DeletaActiveOrder() {
    const index = this.ActiveOrdersArray.indexOf(this.FilteredOrder);
    this.ActiveOrdersArray.splice(index, 1);
    this.ActiveOrdersStorage(this.ActiveOrdersArray);

  }


  // * VIEW ACTIVE ORDER ARRAY \\
 ActiveOrdersStorage(orders: OrdersInterface[]) {
  this.storage.set(this.ActiveStoreKey, orders).then((savedresult) => {

  //  this.ActiveOrdersArray = savedresult;
    this.LoadActiveSavedOrders();
   // this.activecounter = this.ActiveOrdersArray.length;
    console.log(this.ActiveOrdersArray);
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

 //   console.log('filtered oreder: ',this.FilteredOrder);
    this.router.navigate(['/view-order-modal']);

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
