import { Component } from '@angular/core';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.css'
})
export class MainComponentComponent {

content = null
  dbError = true

  constructor() {

   

/*
    http.get(`http://localhost/content-builder.php?type=angular`)
    .subscribe(
      (data:any) => {
        this.content = data[0].content
        //console.log(data)
      },
      err => {
        this.dbError = true

      }

    )

*/
  }

}
