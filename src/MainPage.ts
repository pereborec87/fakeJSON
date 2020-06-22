import Component from "vue-class-component";
import Vue from "vue";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { IHistoryAction } from ".";

export interface IElement {
    id: string;
    name: string;
}

@Component({
    template: require("./MainPage.html")
})
export default class MainPage extends Vue {
    public sourceItems: IElement[] = [];
    public targetItems: IElement[] = [];

    mounted(): void {
        const PUBLIC_API_URI = "http://my-json-server.typicode.com/pereborec87/fakeJSON/customers";
        Axios.get(PUBLIC_API_URI)
            .then((response: AxiosResponse) => {
                this.sourceItems = response.data;
            })
            .catch((error: AxiosError) => {
                console.error("Ошибка получения данных");
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
        this.$store.commit("addHistoryAction", <IHistoryAction>{
            name: el.name,
            id: el.id,
            actionType: "add",
            time: (new Date()).toISOString()
        });
    }

    public onRemoveElement(el: IElement): void {
        let index = this.targetItems.findIndex((targetEl: IElement) => {
            return targetEl.id === el.id;
        });
        if (index !== undefined) {
            this.targetItems.splice(index, 1);
        }
        this.sourceItems.push(el);
        this.$store.commit("addHistoryAction", <IHistoryAction>{
            name: el.name,
            id: el.id,
            actionType: "remove",
            time: (new Date()).toISOString()
        });
    }
}