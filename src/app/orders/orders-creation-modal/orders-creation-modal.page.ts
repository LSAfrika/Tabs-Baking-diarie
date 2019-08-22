import { Component, OnInit } from '@angular/core';
import { OrdersInterface } from 'src/app/interfaces/orders.interface';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderManagerService } from 'src/app/services/orderManager.service';


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

  ActiveOrdersTestArray: OrdersInterface[] = [];

  constructor(private alertController: AlertController,
              public FB: FormBuilder,
              private OrdersManager: OrderManagerService) {






  }



  ngOnInit() {

    this.OrdersFormGroup = this.FB.group({
      orderdate: this.setDate(),
      Clientname: ['', [Validators.required, Validators.minLength(5)]],
      Clientcontacts: [null, [  Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9)] ],
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
 this.OrdersManager.SaveOrder(order);

 this.ActiveOrdersTestArray.push(order);
 console.log(this.ActiveOrdersTestArray);
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
