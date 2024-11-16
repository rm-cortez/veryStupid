import { Component } from '@angular/core';
import { IntroComponent } from '../../htmlComponents/intro/intro.component';
import { DataServiceService } from './data-service.service';
import { NgFor } from '@angular/common';
import { StatsComponent } from '../../htmlComponents/html/stats/stats.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IntroComponent,NgFor,StatsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

choices = [{rn: 0, id: 0, icon: 'stupid'}]
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
  icons = [{rn: 0, id: 0, icon: 'stupid'}]

  constructor(public ds:DataServiceService){
   
    
    this.choices = []
    

    
    var shuffledIcons:any[] = []
    shuffledIcons  = ds.getDataIcons()
    var idxs:any[] = this.shuffle(shuffledIcons.length)

    //console.log('idx',idxs)
    this.icons = []
    //this.icons = Array.from(shuffledIcons)
    idxs.forEach( (idx:any) => this.icons.push(shuffledIcons[idx]) )

    
    //console.log('shuffled',shuffledIcons,this.icons)

  }
 
 clear_resultMsg(){
    setTimeout(() => {
      this.result  = ""
      this.result_animation = ""
    }, 2000)
  }

  getRandomNumber(maxNum:any){

     return Math.floor( Math.random() * maxNum )
   }


  show_icon(e:any){


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
         
        var choice1 = this.icons.filter(icon => `${icon.id}` == `${this.choices[0].id}`)[0].icon
        var choice2 = this.icons.filter(icon => `${icon.id}` == `${this.choices[1].id}`)[0].icon

        //console.log(choice1,choice2,this.choices[0],this.choices[1])

         

        
        //checks if both cards are not equal
        if(choice1 != choice2){

          this.resultColor = 'danger'
          this.result  = this.wrongMessages[Math.floor( Math.random() * this.wrongMessages.length )]
          this.result_animation = "animate__fadeInUp"


          setTimeout(() => {
            this.clear_resultMsg();

            (this.choices).forEach( (choice:any) => {
             // choice.classList.remove("animate__fadeOut")
             // choice.classList.add("animate__fadeInUp")
              console.log(choice.id,'que pase el cojudo') 
              if(choice.id > 0){
                var theChoice = document.querySelector(`.elImbecil-${choice.id}`) as HTMLDivElement
                theChoice.classList.remove("animate__fadeOut")
                theChoice.classList.add("animate__fadeInUp")

              }
            })
            this.choices = []
            console.log('no, que pase el imbecil')
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
	
shuffle(numLength:any) {

    var array:any[] = []

    for(var idx =0;idx < numLength;idx++){
      array.push(idx)
    }


    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
  }

}
