import { Component, OnInit } from '@angular/core';
import { OrdersInterface } from 'src/app/interfaces/orders.interface';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderManagerService } from 'src/app/services/orderManager.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-creation-modal',
  templateUrl: './orders-creation-modal.page.html',
  styleUrls: ['./orders-creation-modal.page.scss'],
})
export class OrdersCreationModalPage implements OnInit {

  OrderToSave = {} as OrdersInterface;

  OrdersFormGroup: FormGroup;
  ErrorValue = '';
  FormValidation = true;
  isEditable = false;

  ActiveOrdersTestArray: OrdersInterface[] = [];

  constructor(private alertController: AlertController,
              public FB: FormBuilder,
              private OrdersManager: OrderManagerService,
              private router: Router) {






  }



  ngOnInit() {
    this.isEditable = this.OrdersManager.isEditable;


    if (this.isEditable === false) {
    this.OrdersFormGroup = this.FB.group({
      orderdate: this.setDate(),
      Clientname: ['', [Validators.required, Validators.minLength(5)]],
      Clientcontacts: ['', [  Validators.required,Validators.minLength(9)] ],
        Clientemail: ['', [ Validators.email]],
        cakeType: ['', [Validators.required, Validators.minLength(5)]],
        cakeColor: ['', [Validators.required, Validators.minLength(3)]],
        Cakeshape: ['', [Validators.required, Validators.minLength(3)]],
        Cakeweight: [null, [Validators.required, Validators.minLength(1)]],
      NumberOfCakes: [null, [Validators.required, Validators.minLength(1)]],
      deliveryDate: [null, [Validators.required]],
      deposit: [null, [Validators.required, Validators.minLength(3)]],
      balance: [null, [Validators.required, Validators.minLength(3)]],
      totalcost: [null, [Validators.required, Validators.minLength(3)]],
      CakeInscription: ['', [Validators.required, Validators.minLength(5)]],
      SpecialInstruction: '',


    });
   } else {

    this.OrdersFormGroup = this.FB.group({
      orderdate: this.OrdersManager.FilteredOrder.orderdate,
      Clientname: [this.OrdersManager.FilteredOrder.Clientname, [Validators.required, Validators.minLength(5)]],
      Clientcontacts: [this.OrdersManager.FilteredOrder.Clientcontacts, [  Validators.required, Validators.minLength(9)] ],
        Clientemail: [this.OrdersManager.FilteredOrder.Clientemail, [ Validators.email]],
        cakeType: [this.OrdersManager.FilteredOrder.cakeType, [Validators.required, Validators.minLength(5)]],
        cakeColor: [this.OrdersManager.FilteredOrder.cakeColor, [Validators.required, Validators.minLength(3)]],
        Cakeshape: [this.OrdersManager.FilteredOrder.Cakeshape, [Validators.required, Validators.minLength(3)]],
        Cakeweight: [this.OrdersManager.FilteredOrder.Cakeweight, [Validators.required, Validators.minLength(1)]],
      NumberOfCakes: [this.OrdersManager.FilteredOrder.NumberOfCakes, [Validators.required, Validators.minLength(1)]],
      deliveryDate: [this.OrdersManager.FilteredOrder.deliveryDate, [Validators.required]],
      deposit: [this.OrdersManager.FilteredOrder.deposit, [Validators.required, Validators.minLength(3)]],
      balance: [this.OrdersManager.FilteredOrder.balance, [Validators.required, Validators.minLength(3)]],
      totalcost: [this.OrdersManager.FilteredOrder.totalcost, [Validators.required, Validators.minLength(3)]],
      CakeInscription: [this.OrdersManager.FilteredOrder.CakeInscription, [Validators.required, Validators.minLength(5)]],
      SpecialInstruction: this.OrdersManager.FilteredOrder.SpecialInstruction,


    });


  }
}


  Viewlog() {
  //  console.log(this.OrdersFormGroup.value);
  }

// * date creator

setDate() {
  const d = new Date(),
    newdate = d.getTime();

  return newdate;
}


//#region FORM CONTROLS

  // * CLIENT NAME FORM FIELD
 get CLIENTNAME() {
   return this.OrdersFormGroup.get('Clientname');
 }

  // * CLIENT CONTACT FORM FIELD
 get CONTACTS() {
  return this.OrdersFormGroup.get('Clientcontacts');
}

  // * CLIENT EMAIL FORM FIELD
  get EMAIL() {
    return this.OrdersFormGroup.get('Clientemail');
  }

  // *  CAKE TYPE FORM FIELD
  get CAKETYPE() {
    return this.OrdersFormGroup.get('cakeType');
  }

   // * CAKE COLOR FORM FIELD
   get CAKECOLOR() {
    return this.OrdersFormGroup.get('cakeColor');
  }
   // * CAKE SHAPE FORM FIELD
   get CAKESHAPE() {
    return this.OrdersFormGroup.get('Cakeshape');
  }

   // * CAKE WEIGHT FORM FIELD
   get CAKEWEIGHT() {
    return this.OrdersFormGroup.get('Cakeweight');
  }

   // * CAKE NUMBER FORM FIELD
   get CAKEORDERNUMBER() {
    return this.OrdersFormGroup.get('NumberOfCakes');
  }


   // * DELIVERY DATE FORM FIELD
   get DELIVERYDATE() {
    return this.OrdersFormGroup.get('deliveryDate');
  }


   // * CAKE DEPOSIT FORM FIELD
   get DEPOSIT() {
    return this.OrdersFormGroup.get('deposit');
  }


   // * CAKE BALANCE FORM FIELD
   get BALANCE() {
    return this.OrdersFormGroup.get('balance');
  }

   // * CAKE TOTALCOST FORM FIELD
   get TOTALCOST() {
    return this.OrdersFormGroup.get('totalcost');
  }

   // * CAKE INSCRIPTION FORM FIELD
   get CAKEINSCRIPTION() {
    return this.OrdersFormGroup.get('CakeInscription');
  }

   // * CAKE SPECIAL INSTRUCTIONJ FORM FIELD
   get SPECIALINSTRUCTION() {
    return this.OrdersFormGroup.get('SpecialInstruction');
  }

  //#endregion


SaveOrder(order) {
  // console.log('order value: ', order);
  if (this.isEditable === false) {
 this.OrdersManager.SaveOrder(order);

 this.ActiveOrdersTestArray.push(order);
 this.SuccesstNotifier(this.OrdersFormGroup.get('Clientname').value);
 console.log(this.ActiveOrdersTestArray);
  } else {
    this.OrdersManager.updateOrder(order);
    this.ActiveOrdersTestArray.push(order);
    this.SuccesstNotifier(this.OrdersFormGroup.get('Clientname').value);
  }
}

creationModalNavigation() {
  if (this.isEditable === false) {
    this.router.navigate(['/tabs/tab5']);

  } else {
    this.router.navigate(['/view-order-modal']);

  }
}


async SuccesstNotifier(notification: string) {
  const alert = await this.alertController.create({
    header: `succesfully saved`,
    message: `<strong>${notification}'s </strong> order has been saved!!!`,
    backdropDismiss: false,
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.OrdersFormGroup.reset();
          this.router.navigate(['/tabs/tab5']);
        }
      }
    ]
  });

  await alert.present();
}









  async alertNotifier(notification: string) {
    const alert = await this.alertController.create({
      header: `please fill the following field`,
      message: notification,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }


}
