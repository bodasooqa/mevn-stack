import Vue from 'vue';
import App from './components/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTasks, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTasks, faTrashAlt);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
