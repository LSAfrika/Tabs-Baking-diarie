import { OrderManagerService } from './../services/orderManager.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popover: PopoverController,
              private router: Router,
              public Ordermanager: OrderManagerService,
              private alertController: AlertController ) { }

  ngOnInit() {}

  dissmiss() {
    this.router.navigate(['/tabs/tab5']);
    this.popover.dismiss();
  }

  editOrder(iseditable?: boolean) {
    this.Ordermanager.isEditable = iseditable;
 //   console.log('iseditable value: ', iseditable);
 //   console.log('active order: ', this.Ordermanager.FilteredOrder);
    this.router.navigate(['/orders-creation-modal']);
    this.popover.dismiss();
  }


  async OrderDeleteNotifier() {
    this.popover.dismiss();
    const alert = await this.alertController.create({
      header: `deleted content can't be recovered`,
      message: `Are you sure want to delete order?`,
      backdropDismiss: false,
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.Ordermanager.DeletaActiveOrder();
            this.router.navigate(['/tabs/tab5']);

          }
        },
        {
          text: 'NO',
          role: 'cancel'

        }
      ]
    });

    await alert.present();

  }

}
