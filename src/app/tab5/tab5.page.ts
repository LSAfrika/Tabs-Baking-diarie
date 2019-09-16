
import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from '../services/orderManager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {


  constructor(public OrdersManager: OrderManagerService, private router: Router) {

  }


  ngOnInit( ) {
  


  }

  viewOrder(date: Date) {
    this.OrdersManager.ViewActiveOrder(date);
  }

  OrderCreationPage(isEditable: boolean) {
    this.OrdersManager.isEditable = isEditable;
    this.router.navigate(['/orders-creation-modal']);
  }


}
