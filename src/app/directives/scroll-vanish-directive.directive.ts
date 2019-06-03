import { Directive, Input, ElementRef, Renderer2, OnInit  } from '@angular/core';
import { DomController } from '@ionic/angular';
@Directive({
  selector: '[appScrollVanishDirective]'
})
export class ScrollVanishDirectiveDirective implements OnInit {
  @Input('appScrollVanishDirective') scrollArea;

  private hidden = false;
  private triggerDistance = 20;
  px=56;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {

    console.log('direective is working');
  }

  ngOnInit() {
  
    this.initStyles();

    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      let delta = scrollEvent.detail.deltaY;

      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      } else if (!this.hidden && delta > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && delta < -this.triggerDistance) {
        this.show();
      }
    });
  }

  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        'transition',
        '0.0s linear'
      );
      this.renderer.setStyle(this.element.nativeElement, 'height', this.px + 'px');
    });
  }

  hide() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'min-height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.element.nativeElement, 'padding', '0');
    });
   
    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', this.px + 'px');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
     // this.renderer.removeStyle(this.element.nativeElement, 'min-height');
      this.renderer.setStyle(this.element.nativeElement, 'padding', '4');
    });

    this.hidden = false;
  }
}
