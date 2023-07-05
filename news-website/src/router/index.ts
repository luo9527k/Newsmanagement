import {createRouter,createWebHashHistory} from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes=[{
    path:'/',
    name:'home',
    component:()=>import('../views/Home.vue')
},
{
    path:'/news',
    name:'news',
    component:()=>import('../views/News.vue')
},{
    path:'/product',
    name:'product',
    component:()=>import('../views/Product.vue')
}
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    Nprogress.start();
    next()
})
router.afterEach((to,from,next)=>{
    Nprogress.done()
})

export default router