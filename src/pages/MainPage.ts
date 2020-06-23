import Component from "vue-class-component";
import Vue from "vue";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { IElement, IHistoryAction } from "../decalrations/Interfaces";
import { ActionTypes } from "../decalrations/enums";
import ListElement from "../components/ListElement";

@Component({
    template: require("./MainPage.html"),
    components: {
        "list-element": ListElement
    }
})
export default class MainPage extends Vue {
    public sourceItems: IElement[] = [];
    public targetItems: IElement[] = [];

    mounted(): void {
        const PUBLIC_API_URI = "https://api.jsonbin.io/b/5ef1285197cb753b4d15df1f/3";
        Axios.get(PUBLIC_API_URI)
            .then((response: AxiosResponse) => {
                this.sourceItems = response.data;
            })
            .catch((error: AxiosError) => {
                console.error("Ошибка получения данных.");
            });
    }

    public onAddElement(el: IElement): void {
        let index = this.sourceItems.findIndex((sourceEl: IElement) => {
            return sourceEl.id === el.id;
        });
        if (index !== undefined) {
            this.sourceItems.splice(index, 1);
        }
        this.targetItems.push(el);
        this.addHistoryAction(el, ActionTypes.Add);
    }

    public onRemoveElement(el: IElement): void {
        let index = this.targetItems.findIndex((targetEl: IElement) => {
            return targetEl.id === el.id;
        });
        if (index !== undefined) {
            this.targetItems.splice(index, 1);
        }
        this.sourceItems.push(el);
        this.addHistoryAction(el, ActionTypes.Remove);
    }

    private addHistoryAction(el: IElement, actionType: ActionTypes): void {
        this.$store.commit("addHistoryAction", <IHistoryAction>{
            name: el.name,
            id: el.id,
            actionType: actionType,
            time: (new Date()).toTimeString()
        });
    }
}