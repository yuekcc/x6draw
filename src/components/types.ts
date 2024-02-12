import { defineComponent, VNode, type DefineComponent } from "vue";

export interface ToolbarItem {
	label: string;
	icon: DefineComponent<any, any, any>;
	render?: (...arg: any[]) => VNode;
	onClick: () => void | Promise<void>;
}
