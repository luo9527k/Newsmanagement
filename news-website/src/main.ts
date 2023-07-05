import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import "element-plus/dist/index.css";
import '../src/style/index.less'


createApp(App).use(router).mount('#app')
