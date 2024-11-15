import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {GetDataService} from '../../get-data.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  content = null
  dbError = false

  constructor(http: HttpClient, gd:GetDataService) {

    //console.log(gd.apiUrl)


    http.get(`${gd.apiUrl}/content-builder.php?type=angular`)
    .subscribe(
      data => {
        this.content = data[0].content
        //console.log(data)
      },
      err => {
        this.dbError = true

      }

    )


  }


}
