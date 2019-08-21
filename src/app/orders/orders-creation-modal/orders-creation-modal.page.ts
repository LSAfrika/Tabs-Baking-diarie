import { Component, OnInit } from '@angular/core';
import { OrdersInterface } from 'src/app/interfaces/orders.interface';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
  numberas = 1.23;

  constructor(private alertController: AlertController, public FB: FormBuilder) {


this.OrderToSave = {} as OrdersInterface;



  }



  ngOnInit() {

    this.OrdersFormGroup = this.FB.group({
      clientname: ['', [Validators.required, Validators.minLength(5)]],
      contact: [null, [  Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9)] ],
      Email: ['', [ Validators.required, Validators.email]],
      caketype: ['', [Validators.required, Validators.minLength(5)]],
      cakecolor: ['', [Validators.required, Validators.minLength(3)]],
      cakeshape: ['', [Validators.required, Validators.minLength(3)]],
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
    console.log(this.OrdersFormGroup.value);
  }



  // * CLIENT NAME FORM FIELD
 get CLIENTNAME() {
   return this.OrdersFormGroup.get('clientname');
 }

  // * CLIENT CONTACT FORM FIELD
 get CONTACTS() {
  return this.OrdersFormGroup.get('contact');
}

  // * CLIENT EMAIL FORM FIELD
  get EMAIL() {
    return this.OrdersFormGroup.get('Email');
  }

  // *  CAKE TYPE FORM FIELD
  get CAKETYPE() {
    return this.OrdersFormGroup.get('caketype');
  }

   // * CAKE COLOR FORM FIELD
   get CAKECOLOR() {
    return this.OrdersFormGroup.get('cakecolor');
  }
   // * CAKE SHAPE FORM FIELD
   get CAKESHAPE() {
    return this.OrdersFormGroup.get('cakeshape');
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
