import Vue from "vue";
export interface IElement {
    id: string;
    name: string;
}
export default class MainPage extends Vue {
    sourceItems: IElement[];
    targetItems: IElement[];
    mounted(): void;
    onAddElement(el: IElement): void;
    onRemoveElement(el: IElement): void;
}
