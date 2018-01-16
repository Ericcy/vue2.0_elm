<template>
  <div class="city">
    <div class="header">
      <i class='back icon iconfont icon-arrow-left' @click='goBack'></i>
      <div class='selectCity'><span>{{cityName}}</span></div>
      <router-link to='/home' class='change'>切换城市</router-link>
    </div>
    <div class="search">
      <div class="seachBox"><input type="text" placeholder="输入学校、商务楼、地址"></div>
      <div class="seachBtn"><input type="button" value='提交' @click="searchInf"></div>
    </div>
    <div class='searchTitle' v-if='historytitle'>搜索历史</div>
    <ul>
      <li v-for="(item,index) in searchResult" @click='getIntonewPage(index,item.geohash)'>
        <div class="title">
          {{item.name}}
        </div>
        <div class="address">
          {{item.address}}
        </div>
      </li>
    </ul>
    <footer @click='clearAll' v-if='clearAllbtn'>清空所有</footer>
  </div>
</template>
<style scoped>
  .header{
    background-color: #3190e8;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color:#fff;
    height: 2rem;
    line-height: 2rem;
  }
  .header .back{
    font-size:1rem;
  }
  .header .selectCity{
    font-weight: 700;
    font-size:.86rem;
  }
  .header .change{
    font-size:.6rem;
    color:#fff;
  }
  .search{
    margin-top:.4rem;
    padding:.4rem .6rem;
    background-color: #fff;
    border-top:1px solid #ccc;
    border-bottom:2px solid #ccc;
  }
  .search input{
    width: 100%;
    outline:none;
    border:0;
    background:none;
    font-size:.7rem;
    line-height: 1.5rem;
  }
  .search .seachBox{
    border:1px solid #ccc;
    border-radius:5px;
    text-indent: 10px;
  }
  .search .seachBtn{
    margin-top:.4rem;
    background-color: #3190e8;
    border-radius:5px;
  }
  .search .seachBtn input{
    color:#fff;
  }
  .searchTitle{
    padding:5px 10px;
    font-size:.5rem;
    border-bottom:2px solid #ccc;
  }
  ul{
    background-color: #fff;
  }
  ul li{
    border-bottom:1px solid #ccc;
    padding:.6rem .6rem;
  }
  ul li .title{
    font-size: .7rem;
    margin-bottom:.4rem;
    color:#333;
  }
  ul li .address{
    font-size:.5rem;
    color:#ccc;
  }
 footer{
   background-color: #fff;
   text-align:center;
   font-size:.7rem;
   color:#666;
   height: 1.6rem;
   line-height: 1.6rem;
  }
</style>
<script>
import {citySelect,searchInfo} from '../service/gerData'
import {setStore,delStore,getStore} from '../config/myUtils'
 export default {
   data () {
     return {
       cityid: '',
       cityName: '', //当前城市名字
       searchTxt: '', // 搜索输入的内容
       searchResult: [], // 搜索的结果
       historytitle: true, // 默认显示搜索历史的头部
       clearAllbtn: true, // 控制清空所有按钮的显示
       placeHistory:[], // 历史搜索记录
     }
   },
   mounted(){
     // 显示当前所在城市
     this.cityid = this.$route.params.cityid
     citySelect(this.cityid).then(res=>this.cityName = res.data.name)
    // 初始化历史记录
    this.initData()
   },
   methods:{
    //  清空搜索历史
     clearAll(){
       delStore('placeHistory')
       $('ul').empty()
       this.clearAllbtn = false;
     },

    //  返回上一页
    goBack(){
      window.history.go(-1)
    },
    // 搜索
    searchInf(){
       // 搜索的数据
      this.searchTxt = $.trim($('.seachBox input').val())
      if(this.searchTxt != ''){
        searchInfo(this.cityid,this.searchTxt).then(res => this.searchResult = res.data)
      }else{
        alert('请输入文字再搜索')
      }
      this.historytitle = false;
      this.clearAllbtn = false;
    },
    // 初始化搜索历史记录
    initData(){
      // 获取搜索历史记录
      let historyList = getStore('placeHistory')
      if(historyList){
        this.searchResult = JSON.parse(historyList)
      }else{
        this.searchResult = [];
        this.clearAllbtn = false;
      }
      console.log(this.searchResult)
    },
    // 点击进入主页
    getIntonewPage(index,geohash){
      let history = getStore('placeHistory');
      let choosePlace = this.searchResult[index];
      if(history){
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach(item => {
          if(item.geohash == geohash){
            checkrepeat = true;
          }
        })
        if(!checkrepeat){
          this.placeHistory.push(choosePlace)
        }
      }else{
        this.placeHistory.push(choosePlace)
      }
      setStore('placeHistory',this.placeHistory)
      this.$router.push({path:'/mysite',query:{geohash}})
    }
   }
 }
</script>