import Vue from 'vue'
import Mint from 'mint-ui'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import { Rate, Radio, Button, Input } from 'element-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
import '@/style/style.css'
// import '@/style/touxiang.css'

Vue.component(Rate.name, Rate)
Vue.component(Radio.name, Radio)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

Vue.use(Mint)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
    App
  }
})
