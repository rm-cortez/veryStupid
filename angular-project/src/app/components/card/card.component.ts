import { Component } from '@angular/core';
import { IntroComponent } from '../../htmlComponents/intro/intro.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
