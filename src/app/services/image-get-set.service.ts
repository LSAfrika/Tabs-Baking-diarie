import {  OnInit, ChangeDetectorRef,Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';

const STORAGE_KEY = 'my_images';

@Injectable({
  providedIn: 'root'
})
export class ImageGetSetService implements OnInit {

  images = [];
 resPath = '';

  constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
              private actionSheetController: ActionSheetController, private toastController: ToastController,
              private storage: Storage, private plt: Platform, private loadingController: LoadingController,
              private ref: ChangeDetectorRef, private filePath: FilePath) { }

    ngOnInit() {
    // this.plt.ready().then(() => {
    //   this.loadStoredImages();
    // });
  }

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

           this.images.push({ name: img, path: finalpath, filePath:filePath });
          } else {

            this.images.push({ name: img, path: resPath, filePath: filePath });

          }

        }
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


  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [{
                text: 'Load from Library',
                icon: 'images',
                handler: () => {
                  //  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                icon: 'camera',
                handler: () => {
                  //  this.takePicture(this.camera.PictureSourceType.CAMERA);
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

takePicture(sourceType: PictureSourceType) {
  const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
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

createFileName() {
  const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
  return newFileName;
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
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
      this.resPath = this.pathForImage(filePath);

      const newEntry = {
          name: name,
          path: this.resPath,
          filePath: filePath
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




}
