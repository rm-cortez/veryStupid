<template>
  <HeaderDiv />
  <home />
  <FooterrDiv />
</template>

<script>
import home from './pages/home.vue'
import HeaderDiv from './components/HeaderDiv.vue'
import FooterrDiv from './components/FooterDiv.vue'

export default {
  name: 'App', 
  components: {
    HeaderDiv,
    home,
    FooterrDiv
  }
}
</script>
