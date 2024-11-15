import { Component } from '@angular/core';
import { IntroComponent } from '../../htmlComponents/intro/intro.component';
import { DataHandlerService } from './data-handler.service';

@Component({
  selector: 'app-known',
  standalone: true,
  imports: [IntroComponent],
  templateUrl: './known.component.html',
  styleUrl: './known.component.css'
})
export class KnownComponent {

states:any[] = []
  counter = 0
  modalRef = null
  map = null

  answerValue = null



  question = {
    question:'',
    title:'',
    answers:['elImbecil','elIdiota','elCojudo']
  }

  btnLabel = {
                  info:'Show Answer',
                  next:'Next',
                  showAnswers:'Show Answers',
                  reload:'Reload'
             }

  wrongMessage = ''
  wrongAnswers = 0
  wrongMessages = [
    'Wrong',
    'Awful',
    'Preposterous',
    'Nah Nah!',
    'Hideous'
  ]

  correctMessage = ''
  correctAnswers = 0
  correctMessages = [
    'Right',
    'Excellent',
    'Splendid',
    'OutStanding',
    'Marvelous',
    'Fabulous',
    'Impeccable'
  ] 



  
  constructor(public hs:DataHandlerService){


   this.wrongMessage = this.wrongMessages[this.getRandomNumber(this.wrongMessages.length)]
    this.correctMessage = this.correctMessages[this.getRandomNumber(this.correctMessages.length)]


   console.log(hs.getStaticData())

   this.states = hs.getStaticData()
   this.init()
  
  }

 init(){

    this.counter = 0
    let fields = this.states[this.counter].fields
    let answer = this.states[this.counter].name


    var answers:any[] = this.returnAnswers(answer,fields)

    //console.log('answers',answers)

    this.question.question = this.states[this.counter].question
    this.question.title = this.states[this.counter].knownFor

    

    this.question.answers = answers

    console.log(this.question)
  }


  returnAnswers(answer:any,fields:any):any[]{
    let currentAnswers = (fields).split(',')
  
  
    let idx = this.getRandomNumber(currentAnswers.length - 1)
  
    let theAnswers = []
    theAnswers.push(currentAnswers[idx])
    theAnswers.push(currentAnswers[idx+1])
    theAnswers.push(answer)
  
    return theAnswers.sort()
  }

  getRandomNumber(maxNum:any){
    return Math.floor( Math.random() * maxNum )
  }

incrementCounter(){

    this.clear_questionView()
  
    this.answerValue = null
    this.counter++
  
    if(this.counter < this.states.length ){
      this.question.question = this.states[this.counter].question,
      this.question.title = this.states[this.counter].knownFor,
      this.question.answers = this.returnAnswers(this.states[this.counter].name,this.states[this.counter].fields)
  
  
    }
    else{
  
      this.wrongAnswers = this.getResults(0)
      this.correctAnswers = this.getResults()
  
    }
  }

  showMap(){}

  reload(){
    location.reload();
  }

  clear_questionView(){

    //Removes h1 answers
    this.clearAnswerSection()
  
    //Gets new r/w messages
    this.wrongMessage = this.wrongMessages[this.getRandomNumber(this.wrongMessages.length)]
    this.correctMessage = this.correctMessages[this.getRandomNumber(this.correctMessages.length)]
  
    //Removes fabicons from badges
    document.querySelectorAll('.badge-section .badge i').forEach(element => {
      element.classList.remove('fa-close')
      element.classList.remove('fa-check')
    })
  
    //Removes btnSection from view
    //document.querySelector('#btnSection').classList.remove('show')
  
    //Clears badge-section for user input
    //document.querySelector('.badge-section').classList.remove('lock-answer')

    var btnSection = (document.querySelector('#btnSection')) as HTMLElement
    btnSection.classList.remove('show')

    var badgeSection = (document.querySelector('.badge-section')) as HTMLElement
    badgeSection.classList.remove('lock-answer')

  }

  getResults(type = 1){

    let results = this.states.filter(state =>  {return state.results == type} )
    return results.length
  }

  clearAnswerSection(){
    //document.querySelector('#right-answer').classList.remove('showAnswer')
    //document.querySelector('#wrong-answer').classList.remove('showAnswer')
    var rightAnswer = (document.querySelector('#right-answer')) as HTMLElement
    rightAnswer.classList.remove('showAnswer')

    var wrongAnswer = (document.querySelector('#wrong-answer')) as HTMLElement
    wrongAnswer.classList.remove('showAnswer')  

}

 rbChangeHandler(e:any){

    this.answerValue = e.target.id
 
 
    //console.log(e.target.id,' = ',this.states[this.counter].name)
    //console.log(e.target.childNodes)
 
   this.clearAnswerSection()
 
 
    if( this.answerValue == this.states[this.counter].name ){
      //document.querySelector('#right-answer').classList.add('showAnswer')
       var rightAnswer = (document.querySelector('#right-answer')) as HTMLElement
      rightAnswer.classList.add('showAnswer')
       e.target.childNodes[1].classList.add('fa-check')
      this.states[this.counter].results= 1
    }else{
      //document.querySelector('#wrong-answer').classList.add('showAnswer')
      var wrongAnswer = (document.querySelector('#wrong-answer')) as HTMLElement
      wrongAnswer.classList.add('showAnswer')
      document.querySelectorAll('.badge-section .badge i').forEach(element => {
        element.classList.add('fa-close')
      })
      this.states[this.counter].results= 0
    }
 
    //document.querySelector('#btnSection').classList.add('show')
    //document.querySelector('.badge-section').classList.add('lock-answer')

    var btnSection = (document.querySelector('#btnSection')) as HTMLElement
    btnSection.classList.add('show')

    var badgeSection = (document.querySelector('.badge-section')) as HTMLElement
    badgeSection.classList.add('lock-answer')
 
    if(this.counter+ 1 == this.states.length){
      this.btnLabel.next = 'Results'
    }
 
 
  }

}
