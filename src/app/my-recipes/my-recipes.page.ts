import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {

  recipeGroup: FormGroup;




  constructor(private modal: ModalController, private fb: FormBuilder, public GService: GlobalServiceService) {



  }


  ngOnInit() {
    this.recipeGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      ingredients: this.fb.array([]),
      procedure: this.fb.array([]),


    });

   // this.recipeGroup.valueChanges.subscribe(console.log);
  }

  get IngredientsArray() {
    return this.recipeGroup.get('ingredients') as FormArray;
  }
  get RecipeTitle(){
    return this.recipeGroup.get('title');
  }

  get ProcedureArray() {
    return this.recipeGroup.get('procedure') as FormArray;
  }

  //#region Ingredients schema
  AddIngredientsSchema() {
    const ingredients = this.fb.group({
     ingredient: ['', [Validators.required, Validators.minLength(3)]]

    });

    this.IngredientsArray.push(ingredients);

  }
deleteIngredientsSchema(i) {
  this.IngredientsArray.removeAt(i);

}
//#endregion

//#region procedure schema
  AddProcedureSchema() {

    const procedures = this.fb.group({
      procedure: ['', [Validators.required, Validators.minLength(3)]]

    });

    this.ProcedureArray.push(procedures);

  }
  deleteProcedureSchema(i) {
    this.ProcedureArray.removeAt(i);

  }
  //#endregion



  SavePersonalRecipe(personalRecipe) {
    this.GService.savePersonalRecepies(personalRecipe);
  }




  dismissModal() {
    this.modal.dismiss();
    this.GService.loadPersonalRecepies();
  }

}
