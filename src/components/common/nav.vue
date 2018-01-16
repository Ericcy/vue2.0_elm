<template>
  <div class='nav'>
    <div class="con">
      <span>elm.com</span>
      <span class="person icon iconfont icon-jikediancanicon03"></span>
    </div>
    <slot name="msite-title"></slot>
  </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   }
 }
</script>

<style scoped>
  .nav{
    min-height: 40px;
    height: 2rem;
    background-color: #3190e8;
    position: fixed;
    width: 100%;
  }
  .nav .con{
    line-height: 2rem;
    padding:0 10px;
  }
  .nav .con span{
    color:#fff; 
  }
  .nav .con .person{
    font-size:.9rem;
    float: right;
  }
</style>