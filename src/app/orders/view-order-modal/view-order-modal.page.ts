import { PopoverComponent } from '../../PopOverfolder/popover.component';
import { ActionSheetController, PopoverController } from '@ionic/angular';
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

  constructor(public Ordermanager: OrderManagerService,
              private optionsSheet: ActionSheetController,
              public popoverController: PopoverController
     ) { }

  ngOnInit() {
    this.viewOrder = this.Ordermanager.FilteredOrder;
  //  console.log('order view template: ',this.viewOrder);
  }

  // * =================================================== \\
  // #region  PICTURE SECTION
  // * =================================================== \\
  async launchActionSheet() {
    const actionSheet = await this.optionsSheet.create({
      header: ' ORDERS MENU  ',
      buttons: [{
        text: 'edit order',
        icon: 'create',
        handler: () => {

        }
      },
      {
        text: 'delete order',
        icon: 'trash',
        handler: () => {

        }
      },
      {
        text: 'mark as complete',
        icon: 'checkmark',
        handler: () => {

        }
      },
      {
        icon: 'close-circle',
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  async popOver(ev: any) {
    const popovermenu = await this.popoverController.create({
      component: PopoverComponent,
      event: ev

    });

    await popovermenu.present();
  }
}
