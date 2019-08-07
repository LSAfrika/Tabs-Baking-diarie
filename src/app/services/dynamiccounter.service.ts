import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamiccounterService {

  orders = 0;

  constructor() { }

  OrdersCount(no?: number): number {
   
    this.orders = no;
    console.log('total orders', this.orders ) ;
    return this.orders;
  }

  notificationCount(no: number): number {
    let count = 0;
    count = no;
    console.log(count);
    return count;
  }
}
