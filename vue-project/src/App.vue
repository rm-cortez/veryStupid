<template>
  <HeaderDiv />
  <div class="row">
    <div class="col-md-12 position-relative" style="padding-right:0">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
              <button class="navbar-toggler d-none" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation" @click="toggleNavbar">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div id="navbarCollaps" class="collapse navbar-collapse show" >
                <ul id="primary-menu" class="navbar-nav mr-auto">
                  <li class="nav-item " style="color:#FF1D1D">
                    CheatSheet
                  </li>
                  <li class="navbar-nav mr-auto">
                    <div class="form-inline form-search" >
                      <div class="badge badge-danger txt-required mr-1"
                            :class="{ 'd-none' : hideRequired}" >
                        Required
                      </div>
                      <input type="text"
                              placeholder="Search"
                              v-on:keyup="processQuery"
                              class="mr-sm-2 form-control"
                              id="nav-search"
                              autocomplete="off">
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
    </div>
    <div class="col-md-12 main-content">
      <div class="col-md-12">
        <div class="p-4">
          <div class="row query-section">
            <div class="query-message">
              <p>
                <i class="fa fa-thumbs-down" v-if="queryResult=='Error'"></i>
                {{queryResult}}
              </p>
              <div class="spinner-border" role="status" v-if="queryResult=='Loading' ">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div class="col-md-4" :id=" fullWidth?'fw-'+query.id :''"
                  v-for="query in content"
                  :key="query.id">

                  <div class="rounded border search-item p-2 text-left bg-white mb-4">

                  <h4 class="m-0 query-lng">{{query.lng}} </h4>
                  <div :class=" showCode? '':'query-title-section' ">
                    <p class="font-weight-lighter query-title" >{{query.title}}</p>
                  </div>

                  <div class="text-center">
                    <hr>
                    <button class="btn btn-outline-dark btn-sm"
                    v-on:click="viewMore" :id="query.id"  >
                    {{viewMoreLbl}}
                    </button>
                  </div>

                  <div :id="'view-more-'+query.id" class="view-more-section mt-2 d-none" >
                    <hr>

                    <div class="alert alert-primary" v-if="query.dsc != null && query.dsc !='' ">
                      <p  class="query-dsc mb-0">
                        {{query.dsc}}
                      </p>
                    </div>

                      <div class="code-section" v-if="query.code != null && query.code !='' " >
                      <pre class="mb-0">{{query.code}}</pre>
                      </div>
                  </div>
                </div>
                  

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterrDiv />
</template>

<script>
import HeaderDiv from './components/HeaderDiv.vue'
import FooterrDiv from './components/FooterDiv.vue'
import axios from 'axios'
import {URL} from './api-config'
import {apiData} from './apiData'





export default {
  name: 'App', 
  components: {
    HeaderDiv,
    FooterrDiv
  },
  data(){
    return {

      hideForm: true,
      hideRequired:true,
      inputVal: '',
      showNavBar: false,
      btnLabel:'Copy',
      queryResult:'',
      fullWidth:true,
      content: [],
      viewMoreLabel: 'View More',
      showCode: false,
      viewMoreLbl: 'View More',
      viewLessLbl: 'View Less'


    }
  },
  methods: {

    processQuery(e){

      

      //console.log('query',val)

      /*
      if(val.length > 0 ){
        this.$root.$emit('eventing', val)
      }
      else{
        //clears view
        this.$root.$emit('clearing')

        //Search form validation
        this.hideRequired = false;
        setInterval( () => this.hideRequired = true    ,2000)
      }
      */

      this.queryResult = 'Loading'


      let val = e.target.value

      if(val.length == 0){
        this.content = []
        this.queryResult = ''
      }
      else{

        let queryUrl = `${URL.apiUrl}/cheatsheet-builder.php?q=`+ encodeURI((val).trim())
        axios({method:'get',url:queryUrl})

        .then(data => {
          if( data.data.length == 0) this.queryResult = 'No Results'

          else if (typeof data.data == 'string'){
            this.db_error(val)
          }
          else{
            this.content = data.data
          }


        })
        .catch(error => {

          console.log(error)
          this.db_error(val)


        })//catch end
      }


    },
    toggleNavbar(){
      this.showNavBar = !this.showNavBar;

    },
    db_error(data) {
      this.queryResult = ''
      this.content = apiData.filter( d => {
                        if ( ((`${d.lng} ${d.code} ${d.dsc} ${d.title}`)).toLowerCase().indexOf(data.toLowerCase()) > -1 )
                          return d
                        else{
                            //this.queryResult = 'No Results'
                        }
                            
                      })

      this.content = new Array(...this.content)
      console.log('content',this.content, this.content.length)
    },
    viewMore: function(e){

      

    /*
      this.showCode = !this.showCode

      let el = '#fw-'+ e.target.id

      if( e.target.innerText == 'View Less'){
        document.querySelector( el ).classList.remove('fullwidth')
      }
     else {
       document.querySelector( el ).classList.add('fullwidth')
     }

     */


    var stupid = e.target.innerText
    let el = '#fw-'+ e.target.id
    let div = '#view-more-'+ e.target.id

     if (stupid == this.viewMoreLbl){

        e.target.innerText = this.viewLessLbl
        document.querySelector( el ).classList.add('fullwidth')
        document.querySelector( div ).classList.remove('d-none')

     }
     else{

        e.target.innerText = this.viewMoreLbl
        document.querySelector( el ).classList.remove('fullwidth')
        document.querySelector( div ).classList.add('d-none')
     }


    }
  },
  beforeUpdate(){
    //clears input field
    //this.inputVal = ''
    //document.querySelector('#navbarCollapse').classList.remove("show")
  }
}
</script>
