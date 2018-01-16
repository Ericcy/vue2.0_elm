import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = {
  geohash: '31.22299,121.36025',//地址geohash值
}
const mutations= {
  increment (state,geohash) {
    state.geohash = geohash
  }
}
export default new Vuex.Store({
  state,
  mutations
})