<template>
  <div v-html="this.mainContent"></div>
</template>

<script>
import {URL} from '../api-config'
import axios from 'axios'
export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      mainContent:null,
      altContent: `
      <div class="border rounded p-4 ">
          <h1 class="db-error-h1"><strong>Vue Project</strong></h1>
          <h3><strong>Technologies Used</strong></h3>
          <ul>
            <li>Axios</li>
             <li>Bootstrap</li>
             <li>Mysql</li>
             <li>PHP (BackEnd)</li>
             <li>Vue-Clipboard</li>
             <li>Vue-Highlightjs</li>
          </ul>
          </div>
      `
    }
  },
  methods: {
    db_error() {
      this.mainContent = this.altContent
    }
  },
  mounted(){

    //console.log(URL)

    axios({method:'get',url:`${URL.apiUrl}/content-builder.php?type=vue`})

      .then(data =>{

          //db error
          if(typeof data.data == 'string'){
            this.db_error()
          }
          else{
            this.mainContent = data.data[0].content
          }

      })
      .catch(err => {

        console.log(err)
        this.db_error()

      })

  }
}
</script>
