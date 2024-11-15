import { Component,EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() title


  constructor(public activeModal: NgbActiveModal) {}


}
