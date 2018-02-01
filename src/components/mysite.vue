<template>
  <div class="mysite">
    <header>
      <i class='back icon iconfont icon-ai219'></i>
      <router-link to='/home' slot='msite-title' class='selectCity'><span>{{mysiteTitle}}</span></router-link>
      <i class="selfInfo icon iconfont icon-wode"></i>
    </header>
    <div class="contain">
      <div class="swiper-container slideList">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide" v-for='(item,index) in slidData'>
            <div class="item" v-for='i in item'>
              <router-link :to="'/shoplist/'+i.title" class="pic"><img :src= "imgBaseUrl + i.image_url"></router-link>
              <div class="name">{{i.title}}</div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class='title'>
        <div class="cont">
          <i class="iconfont icon-iconfontdianpu"></i>
          <span>附近商家</span>
        </div>
      </div>
      <div class="slist"><shop-list></shop-list></div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import headTop from './common/nav'
import Swiper from "swiper"
import { slidInfo,getAddress,cityGuess,shopList } from '../service/gerData'
export default {
  data() {
    return {
      slidData: [], //轮播数据
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      mysiteTitle: '',  // mysite页面被选中的地址
      geohash: '',  // 页面传过来的经纬度
      selectCity: '',
      flag:false
    };
  },
  components:{
    headTop
  },
  async beforeMount(){
    this.geohash = this.$route.query.geohash
    if(!this.geohash){
      this.selectCity = await cityGuess().then(res=> {return res.data})
      this.geohash = this.selectCity.latitude+','+this.selectCity.longitude
    }
    // 存到vuex中

    // 根据经纬度获取位置信息
    let title = await getAddress(this.geohash)
    this.mysiteTitle = title.data.name
  },
  mounted() {
    this.initPage();
  },
  updated() {},
  methods: {
    // 初始化页面
    initPage() {
      // 轮播图初始化
      slidInfo().then(res => {
        let slidLength = res.data.length
        let resArr = [...(res.data)]
        let foodArr = []
        for(let i=0,j=0; i<slidLength; i+=8,j++){
          foodArr[j] = resArr.splice(0,8)
        }
        this.slidData = foodArr
      }).then(()=>{
        var mySwiper = new Swiper(".swiper-container", {
          pagination: {
            el: '.swiper-pagination',
          },
          loop:true,
          autoplay:false
          
        });
      })
      // 商铺列表初始化
      //shopList(this.selectCity.latitude,this.selectCity.longitude).then(res => {this.shoplist = res.data;console.log(this.shoplist)})
      
    }
  }
};
</script>

<style scoped>
.mysite{
  overflow: hidden;
}
header {
  background-color: #3190e8;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  color: #fff;
  height: 2rem;
  line-height: 2rem;
  position: fixed;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
}
header .back {
  font-size: 1rem;
}
header .selectCity {
  font-size: 0.86rem;
  color:#fff;
  width: 8.5rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align: center;
}
header .selfInfo {
  font-size: 0.76rem;
  color: #fff;
}
/* 滚动条的调整 */
.contain{
    position: fixed;
    top: 2rem;
    bottom: 2rem;
    overflow: scroll;
}
.slideList{
  background-color: #fff;
  height: 8.8rem;
  margin-bottom:.7rem;
  border-bottom:1px solid #e4e4e4;
  
}
.slideList .slide{
  color:#666;
  width: 100%!important;
}
.slideList .item{
  float: left;
  width: 25%;
  text-align:center;
  padding:.5rem 0;
}
.slideList .item img{
  width: 2rem;
}
.slideList .item .name{
  font-size:.6rem;
}
.swiper-container-horizontal>.swiper-pagination-bullets{
  bottom:5px;
}

.title{
  background-color: #fff;
}
.title .cont{
  padding:10px 20px 5px;
  color:#666;
  font-size:.6rem;
}
.title .cont i{
  font-size:.8rem;
  padding-right:5px;
}
</style>