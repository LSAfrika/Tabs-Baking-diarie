import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MyRecipesPage } from './../my-recipes/my-recipes.page';
import { RecepieviewPage } from './../recepieview/recepieview.page';
import { ModalController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';
import { IonContent, IonHeader } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private FormModal: ModalController, public GService: GlobalServiceService) { }

  //#region Scrolling components
  // @ViewChild(IonContent) content: IonContent;
  // @ViewChild(IonContent, { read: ElementRef }) contentElem: ElementRef;
  // @ViewChild(IonHeader, { read: ElementRef }) header: ElementRef;


  // scrollTop = 0;
  // lastscroll = 0;
  // direction = '';
  // navheight = 0;
  // tapping = false;
  // scrolling = false;
  //#endregion



  IsActive = true;
  Tab1 = false;
  Tab2 = true;

  // ngAfterViewInit() {
  //   this.content.scrollEvents = true;
  //   setTimeout(() => {
  //     this.navheight = this.header.nativeElement.offsetHeight;
  //     let scrollContent: any = this.contentElem.nativeElement.shadowRoot.querySelector('.inner-scroll');
  //     scrollContent.style.top = '-' + this.navheight + 'px';
  //     scrollContent.style.paddingTop = parseInt(window.getComputedStyle(scrollContent)['padding-top'], 10) + this.navheight + 'px';
  //   }, 100);
  //   this.content.ionScroll.subscribe((e) => {
  //     this.scrolling = true;
  //     let x = this.lastscroll - e.detail.scrollTop;
  //     this.direction = x > 0 ? 'up' : 'down';
  //     this.lastscroll = e.detail.scrollTop;
  //     this.scrollTop = this.scrollTop - x;
  //     if (this.scrollTop > this.navheight)
  //       this.scrollTop = this.navheight;
  //     if (this.scrollTop < 0)
  //       this.scrollTop = 0;
  //     this.header.nativeElement.style.transform = 'translate3d(0, ' + -this.scrollTop + 'px, 0)';
  //   });
  //   this.contentElem.nativeElement.addEventListener('touchend', () => { this.tapping = false; this.c(); });
  //   this.contentElem.nativeElement.addEventListener('touchstart', () => this.tapping = true);
  //   this.content.ionScrollEnd.subscribe(() => { this.scrolling = false; this.c() });
  // }

  // private c() {
  //   if (this.tapping || this.scrolling)
  //     return false;
  //   if (this.scrollTop == 0 || this.scrollTop == this.navheight)
  //     return false;
  //   let content = this.content;
  //   let scrollTopTemp = this.scrollTop;
  //   if (this.direction == 'down') {
  //     if (this.scrollTop < this.navheight) {
  //       content.scrollByPoint(0, (this.navheight - scrollTopTemp), (this.navheight - scrollTopTemp) * 6);
  //     }
  //   } else if (this.direction == 'up') {
  //     if (this.scrollTop < this.navheight) {
  //       content.scrollByPoint(0, -scrollTopTemp, scrollTopTemp * 6);

  //     }
  //   }
  // }














  ngOnInit() {
    this.GService.loadAppRecipies();

  }

  ionViewWillEnter() {
    this.Tab1 = false;
    this.Tab2 = true;
    this.IsActive = true;

  }

  StateToggler(state: boolean) {
    if (state) {
      this.Tab1 = false;
      this.Tab2 = true;
      this.IsActive = true;

    }

    else {
      this.Tab1 = true;
      this.Tab2 = false;
      this.IsActive = false;

    }

  }


  async createForm() {
    const newrecepie = await this.FormModal.create({
      component: MyRecipesPage,
      backdropDismiss: false,

    });
    await newrecepie.present();
  }


  ViewRecepie(title: string) {
    this.GService.loadSpecificRecipe(title);
    this.PresentRecepieModal();
  }


  async PresentRecepieModal() {

    const View = await this.FormModal.create({
      component: RecepieviewPage,
      backdropDismiss: false,

    });
    await View.present();
  }

}
