<template>
  <section class='shoplist'>
      <ul>
        <li v-for='item in shoplist'>
          <div class="pic"><img :src="baseUrl+ item.image_path " alt=""></div>
          <div class="info">
            <div class="goodname">
              <div class="tname"><i class='pinpai icon iconfont icon-pinpai'></i>{{item.name}}</div>
              <ul class='bzp'>
                <li>保</li>
                <li>准</li>
                <li>票</li>
              </ul>
            </div>
            <div class="score">
              <div class="left">
                <div class="start"><rating-star :rating='item.rating'></rating-star><span class='star_score' v-html='item.rating'></span>&nbsp;月销{{item.recent_order_num}}单</div>
              </div>
              <div class="right" :style="{fontSize:blue}"><span :style='fengBird'>蜂鸟专送</span><span :style='onTime'>准时达</span></div>
            </div>
            <div class="price">
              <div class="l">￥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}</div>
              <div class="t">26.5公里 / 56分钟</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
</template>
<style scoped>
  /* shoplist */
.shoplist{
  background-color: #fff;  
}
.shoplist li{
  display: flex;
  justify-content: space-between;
  align-items:center;
  font-size:.55rem;
}
.shoplist .info{
  width: 100%;
  padding:20px;
}
.shoplist .pic img{
  width: 2.7rem;
  height: 2.7rem;
  /* box-sizing: border-box; */
  padding-left:.6rem;
}
.shoplist .info .goodname{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.shoplist .info .goodname .tname{
  width: 6.3rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.shoplist .info .goodname .tname .pinpai{
  font-size:.9rem;
  color:#ffd930;
  vertical-align: middle;
  padding-right:6px;
}
.shoplist .info .goodname .bzp{
  width: 1.85rem;
  display: flex;
  justify-content: space-around;
}
.shoplist .info .goodname .bzp li{
  font-size:.4rem;
  margin:0 auto;
  color:#666;
  border:1px solid #f1f1f1;
  height: .6rem;
  border-radius: 5px;
  padding:3px;
  box-sizing:border-box;
}
.shoplist .info .score{
  display:flex;
  justify-content: space-between;
  margin:10px 0;
}
.shoplist .info .score .start{
  vertical-align: bottom;
}
.shoplist .info .score .start .star_score{
  color:orange;
}
.shoplist .info .score .left{
  display:flex;
}
.shoplist .info .price{
  display:flex;
  justify-content: space-between;
}
</style>
<script>
import {cityGuess,getAddress,shopList} from '../../service/gerData'
  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
        geohash: '',  // 页面传过来的经纬度
        selectCity: '',
        shoplist: [],
        baseUrl: 'http://cangdu.org:8001/img/',  // shoplist 的图片
        blue:'.4rem',
        fengBird:{
          border:'1px solid #57A9FF',
          background:'#57A9FF',
          color:'#fff',
          borderRadius:'4px',
          padding:'2px 1px',
          marginRight:'3px'
        },
        onTime:{
          border:'1px solid #3190e8',
          background:'#fff',
          color:'#3190e8',
          padding:'2px 1px 2px 3px',
          borderRadius:'4px',
        }
      }
    },    
    mounted() {
      this.initPage();
    },
    updated() {},
    methods: {
      // 初始化页面
      initPage() {
        // 商铺列表初始化
        this.geohash = this.$route.query.geohash
        if(!this.geohash){
          cityGuess().then(res=> {
            this.selectCity =  res.data;
            this.geohash = this.selectCity.latitude+','+this.selectCity.longitude
          }) 
        }
        // 根据经纬度获取位置信息
        getAddress(this.geohash).then(res=>{
          this.mysiteTitle = res.data.name
        }) 
        shopList(this.selectCity.latitude,this.selectCity.longitude).then(res => {this.shoplist = res.data}) 
      }
    }
  }
</script>

