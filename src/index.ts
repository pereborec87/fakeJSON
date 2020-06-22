import Vue from "vue";
import VueRouter from "vue-router";
import Page from "./Page";
import Main from "./Main";
import History from "./History";

Vue.use(VueRouter);
// Vue.use(Vuex);

function createVueInstance(): void {
    let routes = [{
        path: '/main',
        name: 'main',
        component: Main
    }, {
        path: '/history/:action',
        name: 'history',
        component: History,
        props: true
    }]
    // Создаю роутер
    let router = new VueRouter({
        routes
    });
    // Создаю store для хранения состояния
    //var store = new Vuex.Store(storeOptions);
    // Создаю экземпляр Vue
    new Vue({
        el: "#app",
        router,
        // store,
        render: (createElement) => {
            return createElement("page");
        }
    });
}

function registerVueComponents(): void {
    Vue.component("main", Main);
    Vue.component("page", Page);
    Vue.component("history", History);
}

registerVueComponents();
createVueInstance();