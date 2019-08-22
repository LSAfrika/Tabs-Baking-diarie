import { OrdersInterface } from 'src/app/interfaces/orders.interface';
import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from 'src/app/services/orderManager.service';


@Component({
  selector: 'app-view-order-modal',
  templateUrl: './view-order-modal.page.html',
  styleUrls: ['./view-order-modal.page.scss'],
})
export class ViewOrderModalPage implements OnInit {

viewOrder: OrdersInterface;

  constructor(public Ordermanager: OrderManagerService) { }

  ngOnInit() {
    this.viewOrder = this.Ordermanager.FilteredOrder;
  //  console.log('order view template: ',this.viewOrder);
  }

}
