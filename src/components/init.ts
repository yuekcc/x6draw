import { Graph, Options, Node, Edge } from "@antv/x6";

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

export interface GraphMetadata {
	nodes: Partial<Node.Metadata>[];
	edges: Partial<Edge.Metadata>[];
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
	onData: (data: GraphMetadata) => void,
) {
	const buf: GraphMetadata[] = [];

	function readToBuffer() {
		const { cells } = gi.toJSON();
		const result: GraphMetadata = { nodes: [], edges: [] };
		for (const cell of cells) {
			if (cell.shape === "edge") {
				result.edges.push(cell);
			} else {
				result.nodes.push(cell);
			}
		}

		buf.push(result);
	}

	function emitData() {
		const lastData = buf.pop();
		if (lastData) {
			onData(lastData);
		}
		buf.length = 0;
	}

	gi.on("cell:mouseup", () => emitData());
	gi.on("node:change:position", () => readToBuffer());
	gi.on("edge:change:vertices", () => readToBuffer());

	const editEvents = [
		"node:added",
		"node:moved",
		"node:removed",
		"node:resized",
		"edge:connected",
		"edge:removed",
	];
	for (const eventName of editEvents) {
		gi.on(eventName, () => emitData());
	}
}
