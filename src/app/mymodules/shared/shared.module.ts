import { HidenavHeaderDirective } from './../../directive/hidenav-header.directive';
import { HidenavContentDirective } from './../../directive/hidenav-content.directive';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollVanishDirective } from 'src/app/directive/scroll-vanish.directive';





@NgModule({
  declarations: [
    ScrollVanishDirective,
    HidenavContentDirective,
    HidenavHeaderDirective

  ],
  imports: [
    CommonModule
  ],
  exports: [ScrollVanishDirective,
            HidenavContentDirective,
            HidenavHeaderDirective
  ]

})
export class SharedModule { }
