<template>
  <div class="w-100">
    <div class="rounded border search-item p-2 text-left bg-white mb-4">

      <h4 class="m-0 query-lng">{{query.lng}} </h4>
      <div :class=" showCode? '':'query-title-section' ">
        <p class="font-weight-lighter query-title" >{{query.title}}</p>
      </div>

      <div class="text-center">
        <hr>
        <button class="btn btn-outline-dark btn-sm"
        v-on:click="viewMore" :id="query.id"  >
        {{showCode ?'View Less' : 'View More'}}
        </button>
      </div>

      <div class="view-more-section mt-2" :class="showCode ? '' : 'd-none'  ">
        <hr>

        <div class="alert alert-primary" v-if="query.dsc != null && query.dsc !='' ">
          <p  class="query-dsc mb-0">
            {{query.dsc}}
          </p>
        </div>

          <div class="code-section" v-if="query.code != null && query.code !='' " >
          <button type="button"
          v-clipboard:copy="query.code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="btn btn-outline-success mb-1">{{btnLabel}}</button>
          <pre v-highlightjs="query.code" class="mb-0">
          <code class="javascript"></code>
          </pre>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueHighlightJS)
Vue.use(VueClipboard)



export default {
  name: 'Query',
  props: {
    query: Object
  },
  data(){
    return{
      btnLabel: 'Copy',
      viewMoreLabel: 'View More',
      showCode: false
    }
  },
  methods:{
    onCopy: function () {
      this.btnLabel= 'Copied!'
      setInterval( ()=> this.btnLabel = 'Copy' ,1000 )
    },
    onError: function (e) {
      console.log('Failed to copy texts' + e.text)
    },
    viewMore: function(e){
      this.showCode = !this.showCode

      let el = '#fw-'+ e.target.id

      if( e.target.innerText == 'View Less'){
        document.querySelector( el ).classList.remove('fullwidth')
      }
     else {
       document.querySelector( el ).classList.add('fullwidth')
     }
    },
  }
}
</script>
