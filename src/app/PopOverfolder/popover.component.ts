import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popover: PopoverController, private router: Router ) { }

  ngOnInit() {}

  dissmiss() {
    this.router.navigate(['/tabs/tab5']);
    this.popover.dismiss();
  }

}
