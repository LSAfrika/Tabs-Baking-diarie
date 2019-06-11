import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
      title: '',
      ingredients: this.fb.array([]),
      procedure: this.fb.array([]),


    });

   // this.recipeGroup.valueChanges.subscribe(console.log);
  }

  get IngredientsArray() {
    return this.recipeGroup.get('ingredients') as FormArray;
  }

  get ProcedureArray() {
    return this.recipeGroup.get('procedure') as FormArray;
  }

  AddIngredientsSchema() {
    const ingredients = this.fb.group({
     ingredient: ''

    });

    this.IngredientsArray.push(ingredients);

  }
deleteIngredientsSchema(i) {
  this.IngredientsArray.removeAt(i);

}



  AddProcedureSchema() {

    const procedures = this.fb.group({
      procedure: ''

    });

    this.ProcedureArray.push(procedures);

  }
  deleteProcedureSchema(i) {
    this.ProcedureArray.removeAt(i);

  }



  SavePersonalRecipe(personalRecipe) {
    this.GService.savePersonalRecepies(personalRecipe);
  }




  dismissModal() {
    this.modal.dismiss();
    this.GService.loadPersonalRecepies();
  }

}
