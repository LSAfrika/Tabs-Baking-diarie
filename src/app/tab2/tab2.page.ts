
import { GlobalServiceService } from './../services/global-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  SearchBarActive = false;
  filter = '';

constructor() {
  console.log(this.SearchBarActive);
  this.filterSubject(1);
}

switchState() {
  this.SearchBarActive = !this.SearchBarActive;
}

filterSubject(filter: number) {

  if (filter === 1) {
    this.filter = 'search for bakers';
  } else if (filter === 2) {
    this.filter = 'search for shops';

  } else if (filter === 3) {
    this.filter = 'search for baking jobs';

  }
}


}
