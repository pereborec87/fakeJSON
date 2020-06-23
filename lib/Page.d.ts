import Vue from "vue";
export interface IRegion {
    id: number;
    name: string;
}
export default class Page extends Vue {
    regions: IRegion[];
    mounted(): void;
}
