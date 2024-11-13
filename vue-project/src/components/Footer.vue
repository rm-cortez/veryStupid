<template>
  <footer class="">
    <div class="row bg-dark rcs-footer">
      <div class="col-md-12 text-center p-3 text-white">
        <a href="/">
        {{anchorLabel}} <i class="fa fa-copyright"></i>
        </a>
        | {{title}}
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data(){
    return {
      title: (new Date).getFullYear(),
      anchorLabel: 'Rcsproductions'

    }
  }
}
</script>
