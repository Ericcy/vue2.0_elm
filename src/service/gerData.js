import Axios from 'axios'

// 获取首页默认地址
export const cityGuess = ()=>Axios.get('http://cangdu.org:8001/v1/cities?type=guess')

// 获取热门城市
export const cityHot = () => Axios.get('http://cangdu.org:8001/v1/cities?type=hot')

// 获取所有城市
export const cityAll = () => Axios.get('http://cangdu.org:8001/v1/cities?type=group')

// 获取所选城市信息
export const citySelect = id => Axios.get('http://cangdu.org:8001/v1/cities/'+ id +'')

//搜索地址
export const searchInfo = (cityid,value) => Axios.get('http://cangdu.org:8001/v1/pois?city_id='+ cityid +'&keyword='+ value +'&type=search')

// mysite 页面轮播数据
export const slidInfo = () => Axios.get('http://cangdu.org:8001/v2/index_entry')

// 获取mysite 页面地址信息
export const getAddress = (geohash) => Axios.get('http://cangdu.org:8001/v2/pois/'+ geohash )

// 获取商铺列表
export const shopList = (latitude,longitude) => Axios.get('http://cangdu.org:8001/shopping/restaurants?latitude='+ latitude +'&longitude='+longitude)