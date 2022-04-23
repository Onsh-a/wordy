import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulary: [],
    lang: 'eng',
    popup: {
      isActive: false,
      type: ''
    },
    auth: {
      isLogged: false,
      currentUser: null,
      authType: undefined,
    },
    toaster: {
      options: {
        isActive: false,
        type: undefined,
        success: undefined,
      }
    },
    currentId: '',
    search: '',
    ascending: true
  },
  actions,
  mutations,
})
