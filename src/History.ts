import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
    template: require("./History.html")
})
export default class HistoryPage extends Vue {
    @Prop()
    action: string;

    public title: string = "all";

    created(): void {
        this.$router.afterEach((to: Route, from: Route) => {
            if (to.params && to.params.action) {
                this.title = to.params.action;
            }
        });
    }
}