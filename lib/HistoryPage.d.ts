import Vue from "vue";
import { IHistoryAction } from ".";
export default class HistoryPage extends Vue {
    action: string;
    actions: IHistoryAction[];
    created(): void;
    mounted(): void;
    private applyActionType;
}
