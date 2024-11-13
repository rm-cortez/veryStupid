<template>
  <header>
    <div class="jumbotron mb-0">
      <div class="logo-container  mx-auto">
        <a href="/" class="custom-logo-link" rel="home">
          <img width="188" height="160" src="@/assets/cropped-logo.png" class="custom-logo" alt="rcsproductions">
        </a>
      </div>
      <div class="text-center mt-4 ">
        <p class="w-50 mx-auto">
          <span class="bg-dark">{{this.tagLine}}</span>
      </p>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      tagLine:null
    }
  },
  methods:{
    db_error(){
      this.tagLine = "A comprehensive knowledge base of Software Development Technologies"
    }
  },
  mounted(){
    axios({method:'get',url:`${URL.apiUrl}/content-builder.php?type=vue`})
      //.then(res => res.json())
      .then(data => {

        if(typeof data.data == 'string'){
          this.db_error()
        }else{

          let customFields = (data.data[0].customFields).split('//')
          this.tagLine = customFields[0]
          //console.log(customFields)
        }
      })
      .catch(err => {
        console.log(err)
        this.db_error()
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
