import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup,FormBuilder,FormArray } from '@angular/forms';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {

  recipeGroup: FormGroup;




  constructor(private modal: ModalController, private fb: FormBuilder) {
   


  }


  ngOnInit() {
    this.recipeGroup = this.fb.group({
      Title:'',
      Ingredients:this.fb.array([]),
      Procedures:this.fb.array([]),


    });

    this.recipeGroup.valueChanges.subscribe(console.log);
  }

  get IngredientsArray(){
    return this.recipeGroup.get('Ingredients') as FormArray;
  }

  get ProcedureArray(){
    return this.recipeGroup.get('Procedures') as FormArray;
  }

  AddIngredientsSchema(){
    const ingredients= this.fb.group({
      ingredient:''

    })

    this.IngredientsArray.push(ingredients);

  }
deleteIngredientsSchema(i)
{
  this.IngredientsArray.removeAt(i);

}



  AddProcedureSchema(){

    const procedures= this.fb.group({
      procedure:''

    })

    this.ProcedureArray.push(procedures);

  }
  deleteProcedureSchema(i){
    this.ProcedureArray.removeAt(i);

  }

 




  dismissModal()
  {
    this.modal.dismiss();
  }

}
