
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  cakeflavours: string[];
  constructor() {
    this.cakeflavours = [
      'chocolate cake',
      'vannilla cake',
      'cinnamon cake',
      'vanilla cinnamon cake',
      'vanilla icecream chocolate cake',
      'fudge lemon cake cake',
      'sweet pine coco cake',
      'tamarind custard  cake',
      'custard apple chocolate cake brownie cake',
      'chocolate cake',
     ];

 
  
  }

  
  ngOnInit( ) {


  }

}
