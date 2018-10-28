import 'iview/dist/styles/iview.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Vue from 'vue';
import iView from 'iview';
import Konva from 'vue-konva';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(Konva);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
