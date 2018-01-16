<template>
  <div class='ratingStar' >
    <section class="star_container" style="display : inline">
      <i class="grey_fill iconfont" v-for="num in 5" :key="num"></i>
    </section>
    <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
      <section class="s_container" >
          <i  class="orange_fill iconfont " v-for="num in 5" :key="num"></i>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:[
    'rating'
  ],
  components: {}
};
</script>

<style scoped>
  .ratingStar{
    position: relative;
    display: inline;
    vertical-align: top;
  }
  .ratingStar i{
    width: .4rem;
    height: .4rem;
    background-size:contain;
    display: inline-block;
  }
  .star_overflow{
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
    /* width: 30%; */
    top:0;
  }
  .orange_fill{
    background:url(../../assets/star2.png) no-repeat center;
  }
  .grey_fill{
    background:url(../../assets/star1.png) no-repeat center;
  }
  
</style>