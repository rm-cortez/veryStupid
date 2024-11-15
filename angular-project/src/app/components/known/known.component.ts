import { Component } from '@angular/core';
import { IntroComponent } from '../../htmlComponents/intro/intro.component';

@Component({
  selector: 'app-known',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './known.component.html',
  styleUrl: './known.component.css'
})
export class KnownComponent {

}
