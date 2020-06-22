import Vue from "vue";
import Component from "vue-class-component";
import Axios, { AxiosResponse, AxiosError } from "axios";

export interface ICustomer {
    id: number;
    name: string;
}

@Component({
    template: require("./Page.html")
})
export default class Page extends Vue {
    public customers: ICustomer[] = [];

    mounted(): void {
        Axios.get("http://my-json-server.typicode.com/pereborec87/fakeJSON/customers")
        .then((response: AxiosResponse) => {
            this.customers = response.data;
        })
        .catch((error: AxiosError) => {
            console.error("Ошибка получения данных");
        });
    }
}
