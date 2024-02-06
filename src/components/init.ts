import { Graph, Options } from "@antv/x6";

const defaultOptions: Partial<Options.Manual> = {
	panning: true,
	mousewheel: true,
	autoResize: true,
	background: {
		color: "#F2F7FA",
	},
	grid: {
		visible: true,
		size: 20,
		type: "dot",
		args: {
			color: "#a0a0a0", // 网点颜色
			thickness: 2, // 网点大小
		},
	},
};

export interface GraphData {
	nodes: any[];
	edges: any[];
}

export type FlowchartDrawPlugin = (gi: Graph) => void | Promise<void>;

export function initX6(container: HTMLElement) {
	const graph = new Graph({
		...defaultOptions,
		container,
	});

	return graph;
}

/**
 * 绑定快捷键
 */
export function bindHotKeys(gi: InstanceType<typeof Graph>) {}

/**
 * 绑定事件处理器
 */
export function bindChangeEvents(
	gi: InstanceType<typeof Graph>,
	emitData: (data: any) => void,
) {
	const buf: any[] = [];

	function readToBuffer() {
		const { cells } = gi.toJSON();
		const graphData = { nodes: [], edges: [] };
		for (const cell of cells) {
			if (cell.shape === "edge") {
				graphData.edges.push(cell);
			} else {
				graphData.nodes.push(cell);
			}
		}

		buf.push(graphData);
	}

	gi.on("cell:mouseup", () => {
		const lastData = buf.pop();
		emitData(lastData);
		buf.length = 0;
	});

	gi.on("node:change:position", () => {
		readToBuffer();
	});
}
