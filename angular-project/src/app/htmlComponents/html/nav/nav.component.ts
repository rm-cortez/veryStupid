import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {routes} from '../../../routes'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {

  rts
  logo = 'assets/img/cropped-logo.png'


  constructor() {
    this.rts = routes

    for(var i=0; i < this.rts.length; i++){

      if(this.rts[i].path == '')
        this.rts[i].pathname = 'Home'

      else{
        this.rts[i].pathname = (this.rts[i].path).replace("-","")
      }
    }
    //console.log(this.rts)
  }
}
