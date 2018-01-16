<template>
  <footer>
    <ul>
      <li :style="{color:r}" @click="toWhere({path: '/mysite', query: {geohash}})">
        <div class='iconfont icon-eliaomo'></div>
        <span>外卖</span>
      </li>
      <li>
        <div class='iconfont icon-kuodasousuofanwei'></div>
        <span>外卖</span>
      </li>
      <li>
        <div class='iconfont icon-order'></div>
        <span>外卖</span>
      </li>
      <li>
        <div class='iconfont icon-wode'></div>
        <span>外卖</span>
      </li>
    </ul>
  </footer>
</template>

<script>
 export default {
   data () {
     return {
       r:'#3190e8'
     }
   },
   components: {

   },
   methods:{
     toWhere(path){
       this.$router.push(path)
     }
   }
 }
</script>

<style scoped>
  footer{
    position: fixed;
    bottom:0;
    width: 100%;
    height: 2rem;
    background-color: #fff;
    border-top:1px solid #ccc;
  }
  footer ul{
    display: flex;
    justify-content: space-between;
    color:#666;
    font-size:.5rem;
    text-align:center;
  }
  ul li{
    width: 25%;
  }
  ul div{
    font-size:.9rem;
    margin-top:.3rem;
  }
</style>