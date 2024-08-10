import type { Component, VNode } from "vue";

export interface ToolbarItem {
	label: string;
	icon: Component;
	render?: (...arg: any[]) => VNode;
	onClick: () => void | Promise<void>;
}
