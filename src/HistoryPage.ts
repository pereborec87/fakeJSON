import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import { IHistoryAction, IState } from ".";

@Component({
    template: require("./HistoryPage.html")
})
export default class HistoryPage extends Vue {
    @Prop()
    action: string;

    public actionType: string = "all";
    public actions: IHistoryAction[] = [];

    created(): void {
        this.$router.afterEach((to: Route, from: Route) => {
            if (to.params && to.params.action) {
                this.actionType = to.params.action;
                this.actions = (<IState>this.$store.state).actions;
                switch (this.actionType) {
                    case "all": {
                        break;
                    }
                    case "add": {
                        this.actions = this.actions.filter((action: IHistoryAction) => {
                            return action.actionType === "add";
                        });
                        break;
                    }
                    case "remove": {
                        this.actions = this.actions.filter((action: IHistoryAction) => {
                            return action.actionType === "remove";
                        });
                        break;
                    }
                }
            }
        });
    }
}