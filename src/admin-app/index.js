import Vue from 'vue';
import App from './components/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTasks, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue'

import router from './router'

Vue.config.productionTip = false

library.add(faTasks, faTrashAlt);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
