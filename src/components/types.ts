import { defineComponent, type DefineComponent } from "vue";

export interface ToolbarItem {
	label: string;
	icon: DefineComponent<any, any, any>;
	onClick: () => void | Promise<void>;
}
