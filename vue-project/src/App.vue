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
              :value="inputVal"
              autocomplete="off">
    </div>
    <div class="row main-content">
      <div class="col-md-12">
        <div class="p-4">
          
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
      showNavBar: false


    }
  },
  methods: {

    processQuery(e){
      let val = e.target.value
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
    },
    toggleNavbar(){
      this.showNavBar = !this.showNavBar;

    }
  },
  beforeUpdate(){
    //clears input field
    this.inputVal = ''
    document.querySelector('#navbarCollapse').classList.remove("show")
  }
}
</script>
