import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulary: [],
    popup: {
      isActive: false,
      type: ''
    },
    toaster: {
      options: {
        isActive: false,
        type: undefined,
        success: undefined,
      }
    },
    currentId: ''
  },
  actions,
  modules: {},
  mutations,
})
