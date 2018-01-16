<template>
  <div class="home">
   <nav-header></nav-header>
   <div class="content">
     <div class="top">
       <div class="tip">
         <span>当前定位城市：</span>
         <strong>定位不准确时，请在城市列表中选择</strong>
       </div>
      <router-link :to="'/city/'+guessCityid"  class="current">
        <span>{{guessCity}}</span>
        <i class="btn icon iconfont icon-arrow-right"></i>
      </router-link>
     </div>
     <div class="hotCity">
       <div class="tpic">热门城市</div>
       <ul class='clearfix'>
         <li v-for='item in hotCity'><router-link :to="'/city/'+item.id">{{item.name}}</router-link></li>
       </ul>
     </div>
     <div class="allCity">
       <ul>
         <li v-for='(item,key,index) in sortallcity' :key='key'>
           <div class="hotCity">
              <div class="tpic">{{key}}
                <span v-if="index ==0">(按字母排序)</span>
              </div>
              <ul class='clearfix'>
                <li v-for='i in item'><router-link :to="'/city/'+i.id">{{i.name}}</router-link></li>
              </ul>
            </div>
         </li>
       </ul>
     </div>
   </div>
  </div>
</template>
<style scoped>
.home{
  overflow: hidden;
}
.content {
  font-size: 0.55rem;
  color: #666;
  margin-top:2rem;
}
.content .top {
  padding-top: 10px;
  background-color: #fff;
}
.content .top .tip {
  display: flex;
  justify-content:space-between;
  font-size: 0.6rem;
  padding: 0 10px;
  height: 1.5rem;
  line-height: 1.5rem;
  border-bottom: 1px solid #ccc;
}
.content .top .tip strong {
  font-size: 0.55rem;
  color: #9f9f9f;
}
.content .top .current {
  display: flex;
  justify-content:space-between;
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 10px;
  color: #3190e8;
  font-size: 0.85rem;
  border-bottom: 2px solid #ccc;
}
.content .top .current i {
  color: #9f9f9f;
  font-size: 0.75rem;
  font-weight: 700;
}

/* 热门城市 */
.content .hotCity {
  border-top: 2px solid #ccc;
  margin-top: 15px;
  background-color: #fff;
}
.content .hotCity .tpic {
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
}
.content .hotCity ul li {
  float: left;
  width: 25%;
  padding:0 10px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  text-align: center;
  height: 1.5rem;
  box-sizing: border-box;
  line-height: 1.5rem;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.content .hotCity ul li a{
  color: #3190e8;
}
.content .hotCity ul li:nth-child(4n) {
  border-right: none;
}
/* 所有城市 */
.content .allCity ul li a{
  color:#666;
}
</style>

<script>
import {cityGuess,cityHot,cityAll} from '../service/gerData'
export default {
  name: "Home",
  data() {
    return {
      guessCity: '',
      guessCityid: '',
      hotCity: [],
      allCity: {}
    };
  },
  mounted(){
    // 获取当前城市
    cityGuess().then(res => {
      this.guessCity = res.data.name;
      this.guessCityid = res.data.id;
    });

    // 热门城市
    cityHot().then(res=>{
      this.hotCity = res.data
    });
     // 所有城市
    cityAll().then(res=>{
      this.allCity = res.data
    })
  },
  computed:{
    // 将获取的数据按照A-Z字母开头排序
    sortallcity(){
      let sortobj = {};
      for(let i=65;i<=90;i++){
        if(this.allCity[String.fromCharCode(i)]){
          sortobj[String.fromCharCode(i)] = this.allCity[String.fromCharCode(i)];
        }
      }
      return sortobj
    }
  },
  methods:{

  }
};
</script>

