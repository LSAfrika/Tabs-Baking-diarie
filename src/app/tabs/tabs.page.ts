import { Component, OnInit } from '@angular/core';
import { DynamiccounterService } from '../services/dynamiccounter.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  orderCount = 0;


constructor(public countersevice: DynamiccounterService){

 
}
ngOnInit() {
this.orderCount = this.countersevice.orders;
console.log('tab bar orders count',this.orderCount);

}



}
