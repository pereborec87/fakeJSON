import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { IElement } from "../decalrations/Interfaces";
import { ElementType } from "../decalrations/enums";

@Component({
    template: require("./ListElement.html")
})
export default class ListElement extends Vue {
    @Prop()
    element: IElement;
    @Prop()
    elementType: ElementType;

    onRemoveElement(element: IElement): void {
        this.$emit("remove", element);
    }

    onAddElement(element: IElement): void {
        this.$emit("add", element);
    }
}