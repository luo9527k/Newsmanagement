import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MianBox from '@/views/MianBox.vue'
import RoutesConfig from './config'
import store from '@/store/index.js'


const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mianbox",
    name: "mianbox",
    component: MianBox
  }
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})




// 判断路由是否跳转
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
      next()
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path:"/login"
      })
    } else {
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        router.removeRoute("mianbox")

        ConfigRouter()
        next({
          path:to.fullPath
        })
      } else {
        next()
      }
    }
  }
})



const ConfigRouter = () => {

  if (!router.hasRoute("mianbox")) {
    router.addRoute({
        path: "/mianbox",
        name: "mianbox",
        component: MianBox
    })
  }
  RoutesConfig.forEach(item => {
   checkPermission(item) && router.addRoute("mianbox", item)
  })

  //   //改变isGetterRouter=true
  store.commit("changeGetterRouter", true)
}

const checkPermission = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role===1
  }
  return true
}
export default router
