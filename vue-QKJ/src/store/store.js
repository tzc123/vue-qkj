import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    popup: {
      state: {
        show: false,
        clientY: 0,
        arrowDirection: false,
        list: [
          { text: '干什么' },
          { text: '干什么' },
          { text: '干什么' },
          { text: '干什么' },
          { text: '干什么' },
        ]
      },
      getters: {
        isShow({show}) {
          return show
        },
        getY({clientY}) {
          return clientY
        },
        getList({list}) {
          return list
        }
      },
      mutations: {
        show(state) {
          state.show = !state.show
        },
        setY(state,clientY) {
          state.clientY = clientY
        },
        setListData(state,list) {
          state.list = list
        }
      },
      actions: {
        show({commit}) {
          commit('show')
        },
        setY({commit},clientY) {
          commit('setY',clientY)
        },
        setDir({commit},list) {
          commit('setListData',list)
        }
      }
    },
    input: {
      state: {
        focus: false
      },
      mutations: {
        focus(state) {
          state.focus = !state.focus
        }
      },
      actions: {
        focus({commit}) {
          commit('focus')
        },
      }
    }
  }
})
export default store