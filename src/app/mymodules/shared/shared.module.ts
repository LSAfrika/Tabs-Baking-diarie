

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollVanishDirective } from 'src/app/directive/scroll-vanish.directive';
//import { IonicHeaderParallaxModule } from 'ionic-header-parallax';





@NgModule({
  declarations: [
    ScrollVanishDirective
   // IonicHeaderParallaxModule

  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollVanishDirective
   // IonicHeaderParallaxModule

  ]

})
export class SharedModule { }
