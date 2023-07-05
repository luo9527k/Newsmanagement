import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueParticles from 'vue-particles'
import '@/util/axios.config'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(VueParticles)
    .mount('#app')
