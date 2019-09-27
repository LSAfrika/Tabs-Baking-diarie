import { ActionSheetController, PopoverController, AlertController } from '@ionic/angular';
import { OrdersInterface } from 'src/app/interfaces/orders.interface';
import { Component, OnInit } from '@angular/core';
import { OrderManagerService } from 'src/app/services/orderManager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-order-modal',
  templateUrl: './view-order-modal.page.html',
  styleUrls: ['./view-order-modal.page.scss'],
})
export class ViewOrderModalPage implements OnInit {

viewOrder: OrdersInterface;

  constructor(public Ordermanager: OrderManagerService,
              private optionsSheet: ActionSheetController,
              public popoverController: PopoverController,
              public router: Router,
              private alertController: AlertController
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
          this.editOrder(true);

        }
      },
      {
        text: 'delete order',
        icon: 'trash',
        handler: () => {
          this.OrderDeleteNotifier();


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

  editOrder(iseditable?: boolean) {
    this.Ordermanager.isEditable = iseditable;
 //   console.log('iseditable value: ', iseditable);
 //   console.log('active order: ', this.Ordermanager.FilteredOrder);
    this.router.navigate(['/orders-creation-modal']);

  }


  async OrderDeleteNotifier() {

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
