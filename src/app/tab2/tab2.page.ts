
import { GlobalServiceService } from './../services/global-service.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
  
})
export class Tab2Page {

  SearchBarActive = false;
  filter = '';
  @ViewChild(IonContent) content: IonContent;

constructor() {
  console.log(this.SearchBarActive);
  this.filterSubject(1);
}



filterSubject(filter: number) {

  if (filter === 1) {
    this.filter = 'bakers near you';
  } else if (filter === 2) {
    this.filter = 'accessories shops near you ';

  } else if (filter === 3) {
    this.filter = 'baking jobs near you';

  }
}


}
