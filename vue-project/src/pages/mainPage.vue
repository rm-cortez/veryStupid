<template>
  <div>
    <div class="row query-section">
      <div v-if="content.length == 0 && queryResult != '' " class="query-message">
        <p>
          <i class="fa fa-thumbs-down" v-if="queryResult=='Error'"></i>
          {{queryResult}}
        </p>
        <div class="spinner-border" role="status" v-if="queryResult=='Loading'">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="col-md-4" :id=" fullWidth?'fw-'+item.id :''"
            v-for="item in content"
            :key="item.id">
            <Query :query="item"></Query>

      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import VueClipboard from 'vue-clipboard2'
import Query from '../components/Query.vue'
import axios from 'axios'
import {URL} from '../api-config'
import {apiData} from '../apiData'

Vue.use(VueHighlightJS)
Vue.use(VueClipboard)

export default {
  name: 'App',
  components: {
    Query
  },
  data(){
    return {
      btnLabel:'Copy',
      queryResult:'',
      fullWidth:true,
      content: []
    }
  },
  methods: {
    db_error(data) {
      this.content = apiData.filter( d => {
                        if ( ((`${d.lng} ${d.code} ${d.dsc} ${d.title}`)).toLowerCase().indexOf(data.toLowerCase()) > -1 )
                          return d
                        else
                            this.queryResult = 'No Results'
                      })
    }
  },
  mounted(){
    //Gets data from main component


    this.$root.$on('eventing', data => {

      this.queryResult = 'Loading'

      let queryUrl = `${URL.apiUrl}/cheatsheet-builder.php?q=`+ encodeURI((data).trim())
      axios({method:'get',url:queryUrl})

      .then(data => {
        if( data.data.length == 0) this.queryResult = 'No Results'

        else if (typeof data.data == 'string'){
          this.db_error(data)
        }
        else{
          this.content = data.data
        }


      })
      .catch(error => {

        console.log(error)
        this.db_error(data)


      })//catch end


    })//root event

    // Clears main content
    this.$root.$on('clearing', () => {
      this.queryResult = ''
      this.content = []
    });



  },

}


</script>
