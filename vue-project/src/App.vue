<template>
  <HeaderDiv />
  <div class="row">
    <div class="col-md-12 position-relative">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation" @click="toggleNavbar">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div id="navbarCollapse" class="collapse navbar-collapse" :class=" showNavBar?'show':''">
                <ul id="primary-menu" class="navbar-nav mr-auto">
                  <li class="nav-item text-white" >
                    CheatSheet
                  </li>
                </ul>
              </div>
            </nav>
    </div>
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
            <div class="col-md-4" :id=" fullWidth?'fw-'+item.id :''"
                  v-for="item in content"
                  :key="item.id">
                  

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterrDiv />
</template>

<script>
//import home from './pages/home.vue'   <home /> import {routes} from './routes'
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
      content: []


    }
  },
  methods: {

    processQuery(e){

      this.queryResult ='Loading'
      let val = e.target.value

      console.log('query',val)

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

        console.log(error,'stupid')
        this.db_error(val)


      })//catch end


    },
    toggleNavbar(){
      this.showNavBar = !this.showNavBar;

    },
    db_error(data) {
      this.queryResult = ''
      this.content = apiData.filter( d => {
                        if ( ((`${d.lng} ${d.code} ${d.dsc} ${d.title}`)).toLowerCase().indexOf(data.toLowerCase()) > -1 )
                          return d
                        else
                            this.queryResult = 'No Results'
                      })

      this.content = new Array(...this.content)
      console.log('content',this.content, this.content.length)
    }
  },
  beforeUpdate(){
    //clears input field
    //this.inputVal = ''
    document.querySelector('#navbarCollapse').classList.remove("show")
  }
}
</script>
