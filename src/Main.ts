import Component from "vue-class-component";
import Vue from "vue";
import Axios, { AxiosResponse, AxiosError } from "axios";

export interface IElement {
    id: string;
    name: string;
}

@Component({
    template: require("./Main.html")
})
export default class Main extends Vue {
    public sourceItems: IElement[] = [];
    public targetItems: IElement[] = [];

    mounted(): void {
        Axios.get("http://my-json-server.typicode.com/pereborec87/fakeJSON/customers")
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
    }

    public onRemoveElement(el: IElement): void {
        let index = this.targetItems.findIndex((targetEl: IElement) => {
            return targetEl.id === el.id;
        });
        if (index !== undefined) {
            this.targetItems.splice(index, 1);
        }
        this.sourceItems.push(el);
    }
}