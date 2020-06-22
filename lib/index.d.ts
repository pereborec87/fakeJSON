export interface IHistoryAction {
    name: string;
    id: string;
    time: string;
    actionType: string;
}
export interface IState {
    actions: IHistoryAction[];
}
