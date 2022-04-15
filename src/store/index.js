import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulary: [],
    popup: {
      isActive: false,
      type: ''
    },
    currentId: ''
  },
  actions: {
    getData({ commit }) {
      fetch("/wordy", {
        method: "GET",
      }).then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.warn("Server returned " + response.status + " : " + response.statusText);
          }
        }).then((data) => {
          commit('setVocabulary', data)
        }).catch((err) => {
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
    },
    addPair({ commit }, data) {
      fetch('/wordy/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
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
      state.popup.type = data.type;
      if (data.type === 'create') {
        state.popup.isActive = true;
      } else if (data.type === 'edit') {
        state.popup.isActive = true;
        state.currentId = data.id;
      } else {
        state.popup.isActive = false;
      }
    }
  },
})
