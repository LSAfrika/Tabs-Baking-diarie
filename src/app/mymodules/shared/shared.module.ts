
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollVanishDirectiveDirective } from 'src/app/directives/scroll-vanish-directive.directive';



@NgModule({
  declarations:[
    ScrollVanishDirectiveDirective

  ],
  imports: [
    CommonModule
  ],
  exports:[ScrollVanishDirectiveDirective]

})
export class SharedModule { }
