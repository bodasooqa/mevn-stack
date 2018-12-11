import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Profile from "./components/Profile.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/admin',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        }
    ]
})
