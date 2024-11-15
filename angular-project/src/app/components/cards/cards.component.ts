import { Component, OnInit } from '@angular/core';
import {GetDataService} from '../../get-data.service'
import {StatsComponent} from '../../htmlComponents/stats/stats.component'



@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  choices = []
  counter = 0
  show_stats = false
  result = ""
  resultColor = ""
  result_animation = ""
  correctMessages = [
    'Right!',
    'Excellent!',
    'Splendid!',
    'OutStanding!',
    'Marvelous!',
    'Fabulous!',
    'Impeccable!'
  ]
  wrongMessages = [
    'Wrong!',
    'Awful!',
    'Preposterous!',
    'Nah Nah!',
    'Hideous!'
  ]
  icons = []

  constructor(gd:GetDataService) {



    gd.getData("icons")
    .subscribe(
        data => {
          this.icons = Object.keys(data).map(function(key) {
               return data[key]

            })
          //console.log(data)
        },
        err  => {

          //db failure
          gd.icons.map( icon => icon.rn = this.getRandomNumber(1000) )

          gd.icons.sort( (a,b) => (a.rn > b.rn) ? 1 : -1  )

          //console.table(gd.icons)

          this.icons = gd.icons
        }
      )
  }

  ngOnInit(): void {
  }

  clear_resultMsg(){
    setTimeout(() => {
      this.result  = ""
      this.result_animation = ""
    }, 2000)
  }

  getRandomNumber(maxNum){

     return Math.floor( Math.random() * maxNum )
   }


  show_icon(e){


    if(this.choices.length < 2){

      if(this.choices.length == 1){
        if(this.choices[0] != e.target)
          this.choices.push(e.target)
      }
      else{
        this.choices.push(e.target)
      }

      //console.log(e.target)
      e.target.classList.add("animate__fadeOut")

      //checks for # of cards revealed
      if(this.choices.length == 2){

        //checks if both cards are not equal
        if(this.choices[0].id != this.choices[1].id){

          this.resultColor = 'danger'
          this.result  = this.wrongMessages[Math.floor( Math.random() * this.wrongMessages.length )]
          this.result_animation = "animate__fadeInUp"


          setTimeout(() => {
            this.clear_resultMsg();

            (this.choices).forEach( choice => {
              choice.classList.remove("animate__fadeOut")
              choice.classList.add("animate__fadeInUp")
              //console.log(choice)
            })
            this.choices = []
          }, 2000);

        }

        //success
        else{

          this.choices = []
          this.resultColor = 'success'
          this.result  = this.correctMessages[Math.floor( Math.random() * this.correctMessages.length )]
          this.result_animation = "animate__fadeInLeft"

          this.clear_resultMsg();

          var shownCards = document.querySelectorAll(".animate__fadeOut").length

          if(shownCards == this.icons.length)
            this.show_stats = true

        }

        //number of tries
        this.counter++;

      }
    }





  }

}
