import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulary: [],
    isPopupActive: false,
    currentId: ''
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
    },
    editPair({ commit }, data) {
      fetch(`/wordy/${data.id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify( { russian: data.russian, english: data.english }) 
      })
    }
  },
  modules: {
  },
  mutations: {
    setVocabulary(state, data) {
      state.vocabulary = data;
    },

    handlePopup(state, data) {
      if (data.type === 'edit') {
        state.isPopupActive = true;
        state.currentId = data.id;
      } else {
        state.isPopupActive = false;
      }
    }
  },
})
