import { Injectable } from '@angular/core';
import { RecepieInterface } from '../interfaces/recepie-interface';
import {Storage} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  AppRecipies: RecepieInterface[] = [];
  ViewRecipie: RecepieInterface;

  personalRecipies: RecepieInterface[] = [];
  KEY = 'personal recipes';
  personalState: boolean =false;

  constructor(public PersonalStorage: Storage) {




   }

   //#region  DefaultRecepies
   loadAppRecipies() {
    this.AppRecipies.push(
      {
        title: 'Chocolate Cake',
      imageUrl: '/assets/cakes/chocolate.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ] ,

      },
      {
        title: 'Lemon Cake',
      imageUrl: '/assets/cakes/lemon.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ] ,

      },
      {
        title: 'Sponge Cake',
      imageUrl: '/assets/cakes/sponge.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ] ,

      },
      {
        title: 'Vanilla Cake',
      imageUrl: '/assets/cakes/vanilla.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ] ,

      },
      {
        title: 'Cinnamon Cake',
      imageUrl: '/assets/cakes/cinnamon.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ] ,

      },
      {
        title: 'Apple Cake',
      imageUrl: '/assets/cakes/apple.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ],

      },
      {
        title: 'Chocolate Cake',
      imageUrl: '/assets/cakes/chocolate.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ],

      },
      {
        title: 'Chocolate Cake',
      imageUrl: '/assets/cakes/chocolate.jpg',
      ingredients: ['1 cup white sugar',
                     '1/2 cup butter',
                      '2 eggs ',
                     ' 2 teaspoons vanilla extract',
                     ' 1 1/2 cups all-purpose flour' ,
                     ' 1 3/4 teaspoons baking powder ',
                     ' 1/2 cup milk'
                    ],
      procedure: [' Preheat oven to 350 degrees F (175 degrees C)',
       'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl',
       ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla',
        'Combine flour and baking powder, add to the creamed mixture and mix well.',
         'Finally stir in the milk until batter is smooth.',
         ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.',
          'For cupcakes, bake 20 to 25 minutes.',
          ' Cake is done when it springs back to the touch'
       ],

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

   loadSpecificPersonalRecipe(Title: string) {
    this.ViewRecipie = this.personalRecipies.find(
      filteredRecipe =>   filteredRecipe.title === Title
      );
    console.log(this.ViewRecipie);

   }

   loadPersonalRecepies() {
    this.PersonalStorage.get(this.KEY).then((savedrecepies) => {

       if (savedrecepies === null) {
         console.log('array is empty');
         return  this.personalRecipies = [];
       } else {
        console.log(this.personalRecipies);
        console.log(this.AppRecipies);
        return this.personalRecipies = savedrecepies;

       }

     }).catch(err => {
      console.log(err);

     }


     );


   }

   savePersonalRecepies(NewRecepie): RecepieInterface[] {
     this.personalRecipies.push(NewRecepie);
     this.PersonalStorage.set(this.KEY, this.personalRecipies).then((savedrecepies) => {
      this.personalRecipies = savedrecepies;

    }).catch(err => {
     console.log(err);
     return null;
    });

     return this.personalRecipies;

   }

 Ispersonalrecepie(personal:boolean):boolean{
   if(personal=== true)
   {
    this.personalState=true;
   }else {
     this.personalState=false;

   }

   return this.personalState;
 }

}
