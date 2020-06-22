import Vue from "vue";
import { IElement } from "../decalrations/Interfaces";
export default class MainPage extends Vue {
    sourceItems: IElement[];
    targetItems: IElement[];
    mounted(): void;
    onAddElement(el: IElement): void;
    onRemoveElement(el: IElement): void;
}
