import Vue from "vue";
import Component from "vue-class-component";
import Axios, { AxiosResponse, AxiosError } from "axios";

export interface IRegion {
    id: number;
    name: string;
}

@Component({
    template: require("./Page.html")
})
export default class Page extends Vue {
    public regions: IRegion[] = [];

    mounted(): void {
        Axios.get("http://my-json-server.typicode.com/pereborec87/fakeJSON/regions")
        .then((response: AxiosResponse) => {
            this.regions = response.data;
        })
        .catch((error: AxiosError) => {
            console.error("Ошибка получения данных");
        });
    }
}
