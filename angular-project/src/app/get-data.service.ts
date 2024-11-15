import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

 apiData = null
 htp:HttpClient
 apiUrl
 icons =
 [
   { rn:0, id:1	, icon: 'fa-arrows-alt'},
   { rn:0, id:2	, icon: 'fa-expand'},
   { rn:0, id:3	, icon: 'fa-pause'},
   { rn:0, id:4	, icon: 'fa-user-circle'},
   { rn:0, id:5	, icon: 'fa-hourglass-end'},
   { rn:0, id:6	, icon: 'fa-star'},
   { rn:0, id:7	, icon: 'fa-arrow-down'},
   { rn:0, id:8	, icon: 'fa-step-backward'},
   { rn:0, id:9	, icon: 'fa-forward'},
   { rn:0, id:10	, icon: 'fa-arrow-up'},
   { rn:0, id:11	, icon: 'fa-stop'},
   { rn:0, id:12	, icon: 'fa-eject'},
   { rn:0, id:13	, icon: 'fa-arrows-alt'},
   { rn:0, id:14	, icon: 'fa-expand'},
   { rn:0, id:15	, icon: 'fa-pause'},
   { rn:0, id:16	, icon: 'fa-user-circle'},
   { rn:0, id:17	, icon: 'fa-hourglass-end'},
   { rn:0, id:18	, icon: 'fa-star'},
   { rn:0, id:19	, icon: 'fa-arrow-down'},
   { rn:0, id:20	, icon: 'fa-step-backward'},
   { rn:0, id:21	, icon: 'fa-forward'},
   { rn:0, id:22	, icon: 'fa-arrow-up'},
   { rn:0, id:23	, icon: 'fa-stop'},
   { rn:0, id:24	, icon: 'fa-eject'}
 ]



  constructor(http:HttpClient) {
    //environment.production console.log("env",)

    this.htp = http


    if(environment.production)
      this.apiUrl = 'http://rcsproductions.us'

    else{

      this.apiUrl = 'http://localhost'
      console.log("apiurl: ", this.apiUrl )

    }

  }

  getData(params = ''){

    return this.htp.get(`${this.apiUrl}/angular-builder.php?${params}`)
  }
}
