import { ModalControllerService } from './../services/modal-controller.service';
import { GlobalServiceService } from './../services/global-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
constructor(public modalctrl:ModalControllerService){

}

LaunchModal(){
  this.modalctrl.createForm();
}


}
