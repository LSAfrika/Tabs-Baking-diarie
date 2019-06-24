import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { GlobalServiceService } from '../services/global-service.service';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {

  recipeGroup: FormGroup;
  cakeImage: any;



  constructor(
     private modal: ModalController,
     private fb: FormBuilder,
     public GService: GlobalServiceService,
     public actionSheetController: ActionSheetController,
     private camera: Camera,
     private imagePicker: ImagePicker,
     private alertController: AlertController
     ) { }


  ngOnInit() {
    this.recipeGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: null,
      ingredients: this.fb.array([]),
      procedure: this.fb.array([]),


    });

    this.recipeGroup.valueChanges.subscribe(console.log);
  }

  //#region ALL FORM VALUES
  get RecipeTitle() {
    return this.recipeGroup.get('title');
  }

  get ImageUrl() {
    return this.recipeGroup.get('imageUrl');
  }

  get IngredientsArray() {
    return this.recipeGroup.get('ingredients') as FormArray;
  }


  get ProcedureArray() {
    return this.recipeGroup.get('procedure') as FormArray;
  }

//#endregion

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

  testValueSet(value){
    this.recipeGroup.patchValue({
      imageUrl:value

    })
  }


  SavePersonalRecipe(personalRecipe) {
    this.GService.savePersonalRecepies(personalRecipe);
    this.alertNotifier();
    this.recipeGroup.reset();
   

  }


   async alertNotifier() {
    const alert = await this.alertController.create({
      header: 'succesfully saved',
      message:  `<strong> ${this.recipeGroup.get('title').value} has been saved</strong>!!!`,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
           this.dismissModal();
          }
        }
      ]
    });
  
    await alert.present();
  }




  dismissModal() {
    this.modal.dismiss();
    this.GService.loadPersonalRecepies();
  }

  // Action sheet
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select image',
      buttons: [ {
        text: 'choose from gallery',
        icon: 'images',
        handler: () => {
          this.takePictureFromGallery() ;
        }
      }, {
        text: 'take a photo',
        icon: 'camera',
        handler: () => {
          this.takePictureFromCamera() ;
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


// CAMERA FUNCTION
takePictureFromCamera() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  };

  this.camera.getPicture(options).then((imageData) => {
    this.cakeImage = 'data:image/jpeg;base64,' + imageData;

    this.ImageUrl.setValue = this.cakeImage;
    console.log(this.ImageUrl.value);
  }, (err) => {
   // Handle error
   console.log('Camera issue:' + err);
  });
}

// GALLERY FUNCTION
takePictureFromGallery() {
  const options = {
    maximumImagesCount: 1,
    width: 512,
    height: 512,
    quality: 90,
    outputType: 1
};

  this.imagePicker.getPictures(options).then((results) => {
    this.cakeImage = results;
    this.ImageUrl.setValue = this.cakeImage;

},
(err) => {
  console.log(err);
});

  }


 

}
