import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { GlobalServiceService } from '../../services/global-service.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { RecepieInterface } from '../../interfaces/recepie-interface';
import { Router } from '@angular/router';

// DB KEY
const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.page.html',
  styleUrls: ['./recipe-creator.page.scss'],
})

export class RecipeCreatorPage implements OnInit {

  recipeGroup: FormGroup;
  cakeImage: any;
  images = [];
 recipeImagevalue = 'default value';

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private toastController: ToastController,
    private webview: WebView,
    private file: File,
    private storage: Storage,
    private fb: FormBuilder,
    public GService: GlobalServiceService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private plt: Platform,
    private filePath: FilePath,

    //
    private alertController: AlertController
  ) { }


  ngOnInit() {

    console.log(this.GService.isRecipeEditable);
    if (this.GService.isRecipeEditable === false) {
      this.recipeGroup = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        date: this.setDate(),
        imageUrl: null,
        ingredients: this.fb.array([]),
        procedure: this.fb.array([]),


      });
    } else {
      this.recipeGroup = this.fb.group({
        title: [this.GService.ViewRecipie.title, [Validators.required, Validators.minLength(5)]],
        imageUrl: this.GService.ViewRecipie.imageUrl,
        ingredients: this.fb.array([

        ]),
        procedure: this.fb.array([]),


      });

      this.polpulateIngredientsArray(this.GService.ViewRecipie);
      this.polpulateProcedureArray(this.GService.ViewRecipie);

    }

    //  const recipe = this.GService.ViewRecipie;
    //  console.log( this.GService.ViewRecipie );
    this.ImageLink('/assets/icon/defaultCake.png');

    console.log(this.setDate());
    this.recipeGroup.valueChanges.subscribe();
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }


// * new date \\
setDate() {
  const d = new Date(),
    newdate = d.getTime();

  return newdate;
}



  // *pulpulate ingredients form array
  polpulateIngredientsArray(recipe: RecepieInterface) {

    const x = recipe.ingredients;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < x.length; i++) {
      //  console.log(`ingredients: ` + i);
      //  console.log(x[i].ingredient);
      this.AddIngredientsSchema(x[i].ingredient);

    }

  }

  // *polpulate procedure form array
  polpulateProcedureArray(recipe: RecepieInterface) {

    const x = recipe.procedure;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < x.length; i++) {
      //  console.log(`procedure: ` + i);
      //  console.log(x[i].procedure);
      this.AddProcedureSchema(x[i].procedure);

    }

  }

  // images loading
  loadStoredImages() {

    this.storage.get(STORAGE_KEY).then(images => {

      if (images) {
        const arr = JSON.parse(images);
        this.images = [];
        for (const img of arr) {
          const filePath = this.file.dataDirectory + img;
          const resPath = this.pathForImage(filePath);
          if (resPath.includes('undefined')) {
            // resPath = 'the path includes undefined';
            const Correctpath = resPath.substr(9);
            const finalpath = 'http://localhost' + Correctpath;

            this.images.push({ name: img, path: finalpath, filePath });
          } else {

            this.images.push({ name: img, path: resPath, filePath });

          }

        }
      }
    });
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

  /**
   * ? find out why the position parameter is there
   */
  AddIngredientsSchema(load?: string) {
    if (this.GService.isRecipeEditable === false) {
      const ingredients = this.fb.group({
        ingredient: ['', [Validators.required, Validators.minLength(3)]]

      });

      this.IngredientsArray.push(ingredients);
    } else {


      const ingredients = this.fb.group({

        ingredient: [load, [Validators.required, Validators.minLength(3)]]

      });
      this.IngredientsArray.push(ingredients);


    }

  }
  // * =================================================== \\
  // ?used in edit section of a recipe
  // * =================================================== \\
  UpdateIngredientsSchema() {
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
  AddProcedureSchema(load?: string) {

    if (this.GService.isRecipeEditable === false) {
      const procedures = this.fb.group({
        procedure: ['', [Validators.required, Validators.minLength(3)]]

      });

      this.ProcedureArray.push(procedures);

    } else {
      const procedures = this.fb.group({
        procedure: [load, [Validators.required, Validators.minLength(3)]]

      });

      this.ProcedureArray.push(procedures);

    }
  }

  UpdateProcedureSchema() {
    const procedures = this.fb.group({
      procedure: ['', [Validators.required, Validators.minLength(3)]]

    });

    this.ProcedureArray.push(procedures);

  }

  deleteProcedureSchema(i) {
    this.ProcedureArray.removeAt(i);

  }
  //#endregion

  ImageLink(value) {

    if (this.GService.isRecipeEditable === false) {
      this.recipeGroup.patchValue({
        imageUrl: value

      });
    }
    // else {
    //   this.recipeGroup.patchValue({
    //     imageUrl: this.GService.ViewRecipie.imageUrl

    //   });

    // }
  }
  UpdateImageLink(value) {

    if (this.GService.isRecipeEditable === true) {

      this.recipeImagevalue = value;

      this.recipeGroup.patchValue({
        imageUrl: value

      });
    }}



  SavePersonalRecipe(personalRecipe) {
    this.GService.savePersonalRecepies(personalRecipe);
    // this.ImageLink(this.ImageGSService.resPath);
    this.alertNotifier('saved');
    this.recipeGroup.reset();


  }


  async alertNotifier(notification: string) {
    const alert = await this.alertController.create({
      header: `succesfully ${notification}`,
      message: `<strong> ${this.recipeGroup.get('title').value}</strong> has been ${notification}!!!`,
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


  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  DeleteRecipe() {

    this.DeleteNotifier();
  }

  async DeleteNotifier() {
    const alert = await this.alertController.create({
      header: `DELETE RECIPE`,
      message: `are you sure you want to delete <strong> ${this.recipeGroup.get('title').value}</strong>`,
      backdropDismiss: false,
      buttons: [

        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.GService.DeletePersonalRecepies();
          }
        }
      ]
    });

    await alert.present();
  }



  // * =================================================== \\
  // #region  PICTURE SECTION
  // * =================================================== \\
  async launchActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        icon: 'images',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        icon: 'close-circle',
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  // * =================================================== \\
  // ?IMAGE SELECTOR
  // * =================================================== \\
  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      targetHeight: 512,
      targetWidth: 512,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

  pathForImage(img: string) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(
      namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
      }, error => {
        this.presentToast('Error while storing file.');
      });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      const arr = JSON.parse(images);
      if (!arr) {
        const newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      const filePath = this.file.dataDirectory + name;
      const resPath = this.pathForImage(filePath);
      this.ImageLink(resPath);
      this.UpdateImageLink(resPath);

      const newEntry = {
        name,
        path: resPath,
        filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      const arr = JSON.parse(images);
      const filtered = arr.filter(name => name !== imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      const correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File removed.');
      });
    });
  }




  //#endregion













}
