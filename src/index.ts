import Vue from "vue";
import Page from "./Page";

function createVueInstance(): void {
    // Создаю экземпляр Vue
    new Vue({
        el: "#app",
        render: (createElement) => {
            return createElement("page");
        }
    });
}

function registerVueComponents(): void {
    Vue.component("page", Page)
}

registerVueComponents();
createVueInstance();