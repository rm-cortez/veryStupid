import { Component,Input  } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {


@Input() title:any


  constructor(public activeModal: NgbActiveModal) {}

}
