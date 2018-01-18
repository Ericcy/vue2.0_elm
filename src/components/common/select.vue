<template>
  <div class='selection'>
    <nav-header></nav-header>
    <div class="select">
      <select name="province" id="provinceid">
        <option value="shanghai">请选择</option>
        <option :value=item.ProID v-for="item in provinceList">{{item.ProName}}</option>
      </select>
       <select name="city" v-model="reset1" id="cityid">
        <option value="" selected>请选择</option>
        <option :value=item.CityID v-for="item in cityList">{{item.CityName}}</option>
      </select>
       <select name="county" v-model="reset2" id="countyid">
        <option value="">请选择</option>
        <option  v-for="item in countyList">{{item.DisName}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import {provincelist,citylist,countylist} from '../../service/gerData'
 export default {
   data () {
     return {
       provinceList:[],
       cityList:[],
       countyList:[],
       reset1:'',
       reset2:''
     }
   },
   components: {

   },
   mounted(){
     var _this = this
     this.getProvince()
     $('#provinceid').change(function(){
       _this.reset1=''
       _this.reset2=''
       _this.getCity(this.value)
     })
     $('#cityid').change(function(){
       _this.getCounty(this.value)
       _this.reset2=''
     })
   },
   updated(){
     //console.log( vm.$refs.selectP)
   },
   methods:{
     // 获取省级数据
    getProvince(){
      provincelist().then((res)=>{
        var res = res.data.data
         if(res.name == 'province'){
           this.provinceList = res.provinceList
         }
       })
    },
    // 获取市级数据
    getCity(value){
      citylist(value).then((res)=>{
        var res = res.data.data
         if(res.name == 'city'){
          this.cityList = []
          for(var i=0; i<res.cityList.length;i++){
            if(res.cityList[i].ProID == value){
            this.cityList.push(res.cityList[i])
            }
          }
         }
       })
    },
    // 获取县级数据
    getCounty(value){
      countylist(value).then((res)=>{
        var res = res.data.data
         if(res.name == 'county'){
          this.countyList = []
          for(var i=0; i<res.countyList.length;i++){
            if(res.countyList[i].CityID == value){
            this.countyList.push(res.countyList[i])
            }
          }
         }
       })
    },
    // select 的 change事件
   }
 }
</script>

<style scoped>
  .selection{
    overflow: hidden;
  }
  .select{
    margin-top:2.5rem;
    background-color: #fff;
    padding:.3rem;
    display: flex;
    justify-content: space-around;
    font-size:.3rem;
  }
  .select select{
    width: 25%;
  }
 
</style>