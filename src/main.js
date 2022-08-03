import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import { VueMasonryPlugin } from 'vue-masonry'


// 引入
import "normalize.css"
import "./style/base.scss"
import "./assets/js/iconfont.js"

createApp(App).use(VueMasonryPlugin).use(store).use(router).use(Vant).mount('#app')
