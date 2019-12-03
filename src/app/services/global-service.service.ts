
import { Injectable } from '@angular/core';
import { RecepieInterface } from '../interfaces/recepie-interface';
import { Storage } from '@ionic/storage';
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
    this.loadAppRecipies();
    this.loadPersonalRecepies();




  }

  //#region  DefaultRecepies
  loadAppRecipies() {
    this.AppRecipies.push(
      {
        title: 'Vanilla Cake',
        imageUrl: '/assets/cakes/chocolate.jpg',
        ingredients: [{ ingredient: '175g (6oz) margarine or softened butter' },
        { ingredient: '175g (6oz)  sugar' },
        { ingredient: '3 eggs ' },
        { ingredient: ' 175g (6oz) self-raising flour, sifted' },
        { ingredient: ' 1tsp baking powder' },
        { ingredient: ' 1tsp vanilla extract' },
        { ingredient: ' pinch of salt' }
        ],
        procedure: [
          // tslint:disable-next-line: max-line-length
          { procedure: ' Heat the oven to 180°C (gas mark 4). Lightly grease an 18cm (7in) round cake tin with a little extra butter or margarine and cut a piece of greaseproof paper or non-stick baking parchment to fit the base of the tin.' },
          // tslint:disable-next-line: max-line-length
          { procedure: 'Put all the ingredients into a large mixing bowl and beat with a wooden spoon or a hand-held mixer for 1 minute, or until just combined. It\'s important not to beat the batter too much - just long enough to make it smooth' },
          // tslint:disable-next-line: max-line-length
          { procedure: ' Pour or spoon the mixture into the tin, smooth the top and bake on the middle shelf of the oven for about 45-50 minutes. The cake is cooked when it looks well risen and golden; the top should spring back when lightly touched with a fingertip. Another test is to insert a skewer into the centre of the cake - it should come out clean' },
          // tslint:disable-next-line: max-line-length
          { procedure: 'Let the cake sit in the tin for 5 minutes, then gently run a knife around the edge and turn the cake out onto a wire rack to cool. Serve dusted with icing sugar.' },


        ],

      },
      {
        title: ' Sponge Cake',
        imageUrl: '/assets/cakes/apple.jpg',
        ingredients: [{ ingredient: '½ cup + 1½ tablespoon (120 grams) granulated sugar' },
        { ingredient: '4 extra large eggs at room temperature' },
        { ingredient: 'a pinch of salt' },
        { ingredient: ' 1 teaspoon grated lemon zest or vanilla extract optional' },
        { ingredient: ' 1 cup + 1 tablespoon (120 grams) cake flour, sifted you can use all-purpose' },
        { ingredient: ' 1  teaspoons baking powder ' },

        ],
        procedure: [
          { procedure: ' Preheat oven to 350 degrees F (175 degrees C)' },
          { procedure: 'Butter and flour (or spray with baking spray) a 20 cm (8 inches) pan.' },
          { procedure: ' Put the eggs, sugar, salt, and lemon zest in a bowl ' },
          { procedure: 'Beat the eggs until very fluffy and pale yellow (about 15/20 minutes on medium/high speed). To test that it has been beaten enough, let a small amount of batter fall into the bowl. If it remains "sitting" on top, it means that it\'s ready.' },
          { procedure: 'Sift the flour on top of the egg mixture, a little at a time, and fold it gently with a wooden spoon.' },
          { procedure: 'Pour the batter into the prepared pan. Don\'t smooth the top or bang the pan on the counter, leave it as it is!' },
          { procedure: 'Bake for 40 minutes or until a toothpick inserted into the center comes out clean. (Remember: do not open the oven for the first 30 minutes!)' },
          { procedure: ' Turn off the oven but leave the cake inside (keep the door slightly open using a wooden spoon) for 5/10 minutes so it can cool down slowly.' },
          { procedure: ' Remove the sponge cake from the oven, let it cool for 10 more minutes, then loosen around the edges with a knife, and flip it on a wire rack upside down (without the pan) to cool completely.' },
          { procedure: ' Cake is done when it springs back to the touch' },


        ],

      },
      {
        title: 'Chocolate Sponge Cake',
        imageUrl: '/assets/cakes/cinnamon.jpg',
        ingredients: [{ ingredient: '120 grams (½ cup+1½ tablespoon) granulated sugar' },
        { ingredient: '4 extra large eggs' },
        { ingredient: ' 1  teaspoons baking powder ' },
        { ingredient: '100 grams (1 cup minus 2 tablespoons - if you use all-purpose flour, 100 grams = 1 cup minus 1 tablespoon) cake flour sifted ' },
        { ingredient: ' 20 grams (3 tablespoons) unsweetened cocoa powder' }
        ],
        procedure: [
          { procedure: ' Preheat oven to 350 degrees F (175 degrees C)' },
          { procedure: 'Butter and flour a 20 cm (8 inch) pan, or spray it with baking spray.' },
          { procedure: ' Put the eggs and sugar in a bowl' },
          { procedure: 'Beat the eggs until very fluffy and pale yellow (about 15 minutes on medium/high speed). To test that it has been beaten enough, let some of the mixture fall into the bowl; if it remains "sitting" on top, that means that it\'s ready.' },
          { procedure: 'Sift the flour and cocoa powder on top of the egg mixture, a little at a time, and fold it gently with a wooden spoon, from bottom to top.' },
          { procedure: 'Pour the batter into the prepared pan. Don\'t smooth the top or bang the pan on the counter; leave it as it is!' },
          { procedure: 'Bake for 40 minutes or until a toothpick inserted into the center comes out clean. (Don\'t open the oven for the first 20 minutes!)' },
          { procedure: ' Turn off the oven but leave the chocolate Italian sponge cake inside for at least 10 minutes so it can cool down slowly (put a wooden spoon in the oven door to keep it slightly open). After that, remove it from the oven, let it cool for 10 more minutes, loosen around the edges with a knife, and then flip the cake on a wire rack upside down (without the pan) to cool completely.' }
        ],

      },
      {
        title: 'Moist Chocolate Cake (no eggs, no butter)',
        imageUrl: '/assets/cakes/lemon.jpg',
        ingredients: [
          { ingredient: '4 teaspoons (16 grams) baking powder ' },
          { ingredient: '1 ½ cup + 2 tablespoons (200 grams) all-purpose flour sifted' },
          { ingredient: '1 cup (200 grams) granulated sugar ' },
          { ingredient: ' 1 ¾ cup + 2 tablespoons (450 ml) soy milk or dairy milk' },
          { ingredient: '2½ tablespoons (35 grams) vegetable oil' },
          { ingredient: ' 1 teaspoon vanilla extract ' },
          { ingredient: ' powdered sugar for dusting' }
        ],
        procedure: [
          { procedure: ' Preheat the oven to 160 degrees C (320 degrees F).' },
          { procedure: 'In a large bowl, combine the flour, sugar, cocoa powder, and baking powder.' },
          { procedure: 'In a separate bowl, whisk the milk, vegetable oil, and vanilla extract.' },
          { procedure: 'Add the wet ingredients to the dry ingredients and stir with a wooden spoon until just combined.Don\'t over-mix!' },
          { procedure: 'Pour the batter into a greased and floured 22 cm (8 inch) pan.' },
          { procedure: ' Bake for 40 minutes or until a toothpick inserted in the center comes out clean.' },
          { procedure: 'Cool the moist chocolate cake on a wire rack and dust with icing sugar before serving.' },
          { procedure: ' enjoy' },


        ],

      },
      {
        title: 'Carrot Cake',
        imageUrl: '/assets/cakes/sponge.jpg',
        ingredients: [{ ingredient: '2 cup white sugar' },
        { ingredient: ' 1 cup oil' },
        { ingredient: '4  eggs ' },
        { ingredient: ' 2 cup flour' },
        { ingredient: '  1 tsp baking soda' },
        { ingredient: '1 tsp baking powder ' },
        { ingredient: '  2 cup carrots, shredded' }
        ],
        procedure: [
          { procedure: ' Preheat oven to 350 degrees F (175 degrees C)' },
          { procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl' },
          { procedure: 'Mix 2 c. sugar, oil and eggs. Add flour, baking soda, baking powder, and cinnamon. Beat for 2-3 minutes until fully combined and fluffy' },
          { procedure: 'Fold in carrots.' },
          { procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.' },
          { procedure: ' enjoy' },

        ],

      },
      {
        title: 'mango Cake',
        imageUrl: '/assets/cakes/vanilla.jpg',
        ingredients: [{ ingredient: '1 cup white sugar' },
        { ingredient: '1/2 cup butter' },
        { ingredient: '2 eggs ' },
        { ingredient: ' 2 teaspoons vanilla extract' },
        { ingredient: ' 1 1/2 cups all-purpose flour' },
        { ingredient: ' 1 3/4 teaspoons baking powder ' },
        { ingredient: ' 1/2 cup milk' }
        ],
        procedure: [
          { procedure: ' Preheat oven to 350 degrees F (175 degrees C)' },
          { procedure: 'Grease and flour a 9x9 inch pan or line a muffin pan with paper liners In a medium bowl' },
          { procedure: ' cream together the sugar and butter Beat in the eggs one at a time then stir in the vanilla' },
          { procedure: 'Combine flour and baking powder, add to the creamed mixture and mix well.' },
          { procedure: 'Finally stir in the milk until batter is smooth.' },
          { procedure: ' Pour or spoon batter into the prepared pan Bake for 30 to 40 minutes in the preheated oven.' },
          { procedure: 'For cupcakes, bake 20 to 25 minutes.' },
          { procedure: ' Cake is done when it springs back to the touch' }
        ],

      }

    );

    // console.log(this.AppRecipies);


  }
  //#endregion


  // tslint:disable-next-line: no-shadowed-variable
  loadSpecificRecipe(Title: string) {
    this.ViewRecipie = this.AppRecipies.find(
      filteredRecipe => filteredRecipe.title === Title
    );


  }

  loadSpecificPersonalRecipe(date: Date) {
    this.ViewRecipie = this.personalRecipies.find(
      filteredRecipe => filteredRecipe.date === date
    );
    //console.log(this.ViewRecipie);

  }

  loadPersonalRecepies() {
    this.PersonalStorage.get(this.KEY).then((savedrecepies) => {

      if (savedrecepies === null) {
        // console.log('array is empty');
        return this.personalRecipies = [];
      } else {
        this.personalRecipies = savedrecepies;
        //  console.log(this.personalRecipies);
        // console.log(this.AppRecipies);
        return this.personalRecipies;

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
      message: ` <strong> RECIPE HAS BEEN DELETED</strong>`,
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
