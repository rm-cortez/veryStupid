import { Component } from '@angular/core';
import {DataHandlerService} from './data-handler.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../htmlComponents/html/modal/modal.component'
import {GetDataService} from '../../get-data.service'

declare var google;

@Component({
  selector: 'app-known-for',
  templateUrl: './known-for.component.html'
})
export class KnownForComponent{
  states:any[] = []
  counter = 0
  modalRef = null
  map = null

  answerValue = null



  question = {
    question:'',
    title:'',
    answers:[]
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

clearAnswerSection(){
  document.querySelector('#right-answer').classList.remove('showAnswer')
  document.querySelector('#wrong-answer').classList.remove('showAnswer')
}

getResults(type = 1){

  let results = this.states.filter(state =>  {return state.results == type} )
  return results.length
}

rbChangeHandler(e){

   this.answerValue = e.target.id


   //console.log(e.target.id,' = ',this.states[this.counter].name)
   //console.log(e.target.childNodes)

  this.clearAnswerSection()


   if( this.answerValue == this.states[this.counter].name ){
     document.querySelector('#right-answer').classList.add('showAnswer')
      e.target.childNodes[1].classList.add('fa-check')
     this.states[this.counter].results= 1
   }else{
     document.querySelector('#wrong-answer').classList.add('showAnswer')
     document.querySelectorAll('.badge-section .badge i').forEach(element => {
       element.classList.add('fa-close')
     })
     this.states[this.counter].results= 0
   }

   document.querySelector('#btnSection').classList.add('show')
   document.querySelector('.badge-section').classList.add('lock-answer')

   if(this.counter+ 1 == this.states.length){
     this.btnLabel.next = 'Results'
   }


 }

getRandomNumber(maxNum){
   return Math.floor( Math.random() * maxNum )
 }


returnAnswers(answer,fields){
  let currentAnswers = (fields).split(',')


  let idx = this.getRandomNumber(currentAnswers.length - 1)

  let theAnswers = []
  theAnswers.push(currentAnswers[idx])
  theAnswers.push(currentAnswers[idx+1])
  theAnswers.push(answer)

  return theAnswers.sort()
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
  document.querySelector('#btnSection').classList.remove('show')

  //Clears badge-section for user input
  document.querySelector('.badge-section').classList.remove('lock-answer')
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

showMap(){

    this.modalRef = this.modalService.open(ModalComponent);


    this.map = new google.maps.Map(document.getElementById("map"), {

      zoom: 4,
      mapTypeControl: false
    })



    if(this.counter == this.states.length){

      this.modalRef.componentInstance.title = 'Answers'

      //default
      this.map.setCenter({lat:39.66397054025678,lng:-101.70125834109443})
      this.map.setZoom(3)

      var markers = []

      this.states.map(st => {
        var marker = new google.maps.Marker({
                  map:this.map,
                  position: {lat:st.lat,lng:st.lng},
                  label: st.abbr,
                  iw:new google.maps.InfoWindow
                })


        marker.iw.setPosition({lat:st.lat, lng: st.lng} );
        marker.iw.setContent(st.dsc);
        //marker.iw.open(this.map, marker);


        marker.addListener('click', function(e){
          this.iw.open(this.map, marker);
        })
      })

    }
    else{
        this.modalRef.componentInstance.title = this.states[this.counter].name

        var lat = this.states[this.counter].lat
        var lng = this.states[this.counter].lng

        this.map.setCenter({lat:lat,lng:lng})

        var marker = new google.maps.Marker({
                  map: this.map,
                  position: {lat:lat,lng:lng},
                  label:this.states[this.counter].abbr
                });

        var infoWindow = new google.maps.InfoWindow
        infoWindow.setPosition({lat:lat, lng: lng} );
        infoWindow.setContent(this.states[this.counter].dsc);
        infoWindow.open(this.map, marker);
      }

}

reload(){
  location.reload();
}

init(){
  this.counter = 0
  let fields = this.states[this.counter].fields
  let answer = this.states[this.counter].name


  let answers = this.returnAnswers(answer,fields)

  this.question.question = this.states[this.counter].question,
  this.question.title = this.states[this.counter].knownFor,
  this.question.answers = answers

}

constructor(ds:DataHandlerService, private modalService: NgbModal, gd:GetDataService) {



      this.wrongMessage = this.wrongMessages[this.getRandomNumber(this.wrongMessages.length)]
      this.correctMessage = this.correctMessages[this.getRandomNumber(this.correctMessages.length)]

        //this.states = ds.getStaticData()
        //console.log(gd.apiUrl)

        gd.getData()
        .subscribe(
            data => {

                this.states =  Object.keys(data).map(function(key) {
                     return data[key]

                  })


                  for(var i=0;i < this.states.length; i++){
                    this.states[i].lat = parseFloat(this.states[i].lat )
                    this.states[i].lng = parseFloat(this.states[i].lng )
                  }
                  //console.log(this.states)
                  this.init()
            },
            error =>{
              this.states = ds.getStaticData()
              this.init()
            }
      )

  }//constructor end

}//class end
