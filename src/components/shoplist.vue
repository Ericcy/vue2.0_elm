<template>
  <div class="shoplist">
    <header>
      <div class="con">
        <i class='back iconfont icon-arrow-left' @click='back'></i>
        <span>{{pagename}}</span>
        <i></i>
      </div>
    </header>
    <div class="list">
      <shop-list></shop-list>
    </div>
  </div>
</template>
<style>
  .shoplist{
    overflow: hidden;
  }
  .list{
    margin-top:2rem;
  }
   .shoplist header{
    position:fixed;
    min-height: 40px;
    height: 2rem;
    line-height: 2rem;
    background-color: #3190e8;
    width: 100%;
    z-index: 1000;
  }
  .con {
    padding:0 .6rem;
    display: flex;
    color:#fff;
    justify-content: space-between;
  }
  .back{
    font-size:1rem;
  }
</style>
<script>
  export default{
    data(){
      return{
        pagename: '', // 页面名字
      }
    },
    mounted(){
      this.pagename = this.$route.params.modulename
    },
    methods:{
      // 返回功能
      back(){
        window.history.go(-1)
      }
    }
  }
</script>

