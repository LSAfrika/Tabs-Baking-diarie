
import { Injectable } from '@angular/core';
import { RecepieInterface } from '../interfaces/recepie-interface';
import {Storage} from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  AppRecipies = [];
  ViewRecipie: RecepieInterface;

  personalRecipies: RecepieInterface[] = [];
  KEY = 'personal recipes';
  personalState = false;
  isRecipeEditable = false;

  constructor(public PersonalStorage: Storage,
              private alertctrl: AlertController,
              private router: Router
    ) {




   }

   //#region  DefaultRecepies
   loadAppRecipies() {
    this.AppRecipies.push(
      {
        title: 'Vanilla Cake',
      imageUrl: '/assets/cakes/chocolate.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                    {ingredient: '1/2 cup butter'},
                    {ingredient: '2 eggs '},
                    { ingredient: ' 2 teaspoons vanilla extract'},
                    {ingredient: ' 1 1/2 cups all-purpose flour' },
                    {ingredient: ' 1 3/4 teaspoons baking powder '},
                    {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      },
      {
        title: 'banana Cake',
      imageUrl: '/assets/cakes/apple.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                     {ingredient: '1/2 cup butter'},
                      {ingredient: '2 eggs '},
                   { ingredient: ' 2 teaspoons vanilla extract'},
                     {ingredient: ' 1 1/2 cups all-purpose flour' },
                     {ingredient: ' 1 3/4 teaspoons baking powder '},
                     {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      },
      {
        title: 'apple Cake',
      imageUrl: '/assets/cakes/cinnamon.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                     {ingredient: '1/2 cup butter'},
                      {ingredient: '2 eggs '},
                   { ingredient: ' 2 teaspoons vanilla extract'},
                     {ingredient: ' 1 1/2 cups all-purpose flour' },
                     {ingredient: ' 1 3/4 teaspoons baking powder '},
                     {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      },
      {
        title: 'vanilla icecream lemon Cake',
      imageUrl: '/assets/cakes/lemon.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                     {ingredient: '1/2 cup butter'},
                      {ingredient: '2 eggs '},
                   { ingredient: ' 2 teaspoons vanilla extract'},
                     {ingredient: ' 1 1/2 cups all-purpose flour' },
                     {ingredient: ' 1 3/4 teaspoons baking powder '},
                     {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      },
      {
        title: 'Chocolate Cake',
      imageUrl: '/assets/cakes/sponge.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                     {ingredient: '1/2 cup butter'},
                      {ingredient: '2 eggs '},
                   { ingredient: ' 2 teaspoons vanilla extract'},
                     {ingredient: ' 1 1/2 cups all-purpose flour' },
                     {ingredient: ' 1 3/4 teaspoons baking powder '},
                     {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      },
      {
        title: 'mango Cake',
      imageUrl: '/assets/cakes/vanilla.jpg',
      ingredients: [{ingredient: '1 cup white sugar'},
                     {ingredient: '1/2 cup butter'},
                      {ingredient: '2 eggs '},
                   { ingredient: ' 2 teaspoons vanilla extract'},
                     {ingredient: ' 1 1/2 cups all-purpose flour' },
                     {ingredient: ' 1 3/4 teaspoons baking powder '},
                     {ingredient: ' 1/2 cup milk'}
                    ],
      procedure: [
        {procedure: ' Preheat oven to 350 degrees F (175 degrees C)'},
      {procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl'},
       {procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla'},
       {procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.'},
       {procedure: 'Finally stir in the milk until batter is smooth.'},
       {procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.'},
       {procedure:  'For cupcakes, bake 20 to 25 minutes.'},
       {procedure:  ' Cake is done when it springs back to the touch'}
       ] ,

      }

    );

   // console.log(this.AppRecipies);


   }
   //#endregion


// tslint:disable-next-line: no-shadowed-variable
   loadSpecificRecipe(Title: string) {
    this.ViewRecipie = this.AppRecipies.find(
      filteredRecipe =>   filteredRecipe.title === Title
      );


   }

   loadSpecificPersonalRecipe(date: Date) {
    this.ViewRecipie = this.personalRecipies.find(
      filteredRecipe =>   filteredRecipe.date === date
      );
    console.log(this.ViewRecipie);

   }

   loadPersonalRecepies() {
    this.PersonalStorage.get(this.KEY).then((savedrecepies) => {

       if (savedrecepies === null) {
         console.log('array is empty');
         return  this.personalRecipies = [];
       } else {
        this.personalRecipies = savedrecepies;
        console.log(this.personalRecipies);
        console.log(this.AppRecipies);
        return this.personalRecipies ;

       }

     }).catch(err => {
      console.log(err);

     }


     );


   }

   savePersonalRecepies(NewRecepie): RecepieInterface[] {
     if (this.isRecipeEditable === false) {
     this.personalRecipies.push(NewRecepie);
     this.PersonalStorage.set(this.KEY, this.personalRecipies).then((savedrecepies) => {
      this.personalRecipies = savedrecepies;

    }).catch(err => {
     console.log(err);
     return null;
    });
  } else {
    const index = this.personalRecipies.indexOf(this.ViewRecipie);
    this.personalRecipies.splice(index, 1, NewRecepie);

    this.PersonalStorage.set(this.KEY, this.personalRecipies).then((savedrecepies) => {
      this.personalRecipies = savedrecepies;

    }).catch(err => {
     console.log(err);
     return null;
    });

    }


     return this.personalRecipies;
    }


// *alert controller after delete has happened

async DeleteNotifier() {
  const alert = await this.alertctrl.create({
    header: `SUCCESS`,
    message:  ` <strong> RECIPE HAS BEEN DELETED</strong>`,
    backdropDismiss: false,
    buttons: [
      {
        text: 'Okay',
        handler: () => {
         this.router.navigate(['/tabs/tab1']);
        }
      }
    ]
  });

  await alert.present();
}




    DeletePersonalRecepies(): RecepieInterface[] {

      const index = this.personalRecipies.indexOf(this.ViewRecipie);
      this.personalRecipies.splice(index, 1);
      this.PersonalStorage.set(this.KEY, this.personalRecipies).then((savedrecepies) => {
      this.personalRecipies = savedrecepies;

     }).catch(err => {
      console.log(err);
      return null;
     });
      this.DeleteNotifier();
      return this.personalRecipies;
   }




 Ispersonalrecepie(personal: boolean): boolean {
   if (personal === true) {
    this.personalState = true;
   } else {
     this.personalState = false;

   }

   return this.personalState;
 }






}
