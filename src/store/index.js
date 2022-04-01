import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulary: []
  },
  actions: {
    getData({ commit }) {
      fetch("/wordy", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(
              "Server returned " + response.status + " : " + response.statusText
            );
          }
        })
        .then((data) => {
          commit('setVocabulary', data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {
  },
  mutations: {
    setVocabulary(state, data) {
      state.vocabulary = data;
    }
  },
})
