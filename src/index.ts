import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Navigator from "./Navigator";
import MainPage from "./MainPage";
import HistoryPage from "./HistoryPage";
import ListElement from "./ListElement";

Vue.use(VueRouter);
Vue.use(Vuex);

export interface IHistoryAction {
    name: string;
    id: string;
    time: string;
    actionType: string;
}

export interface IState {
    actions: IHistoryAction[];
}

function createVueInstance(): void {
    let routes = [{
        path: '/',
        redirect: { name: 'main' }
    }, {
        path: '/main',
        name: 'main',
        component: MainPage
    }, {
        path: '/history/:action',
        name: 'history',
        component: HistoryPage,
        props: true
    }]
    // Создаю роутер
    let router = new VueRouter({
        routes
    });
    // Создаю store для хранения состояния
    var store = new Vuex.Store(storeOptions);
    // Создаю экземпляр Vue
    new Vue({
        el: "#app",
        router,
        store,
        render: (createElement) => {
            return createElement("page");
        }
    });
}

function registerVueComponents(): void {
    Vue.component("main", MainPage);
    Vue.component("page", Navigator);
    Vue.component("history", HistoryPage);
    Vue.component("list-element", ListElement);
}

const storeOptions = {
    state: {
        actions: []
    },
    mutations: {
        addHistoryAction(state: IState, historyAction: IHistoryAction): void {
            this.state.actions.push(historyAction);
        }
    }
}

registerVueComponents();
createVueInstance();