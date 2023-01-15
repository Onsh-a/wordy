import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default new Vuex.Store({
  state: {
    vocabulary: [],
    lang: 'eng',
    popup: {
      isActive: false,
      type: '',
      errors: [],
    },
    auth: {
      userId: null,
      userName: undefined,
      authType: undefined,
    },
    toaster: {
      isActive: false,
      type: undefined,
      isSuccess: undefined,
    },
    asyncManagement: {
      pending: false,
    },
    currentPairId: null,
    search: '',
    ascending: true
  },
  actions,
  mutations,
  getters,
})
