import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    //控制路由跳转
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    //控制侧边栏是否折叠
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state, value) {
      state.userInfo={}
    }
  },
  actions: {
  },
  modules: {
  },
  // 安装vuex插件
  plugins: [createPersistedState({
    paths: ["isCollapsed","userInfo"] //控制Collapsed是否持久化
  })],
})
