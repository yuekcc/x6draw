import { defineComponent, ref } from "vue";
import { useFlowchartDraw } from "./components";

export default defineComponent({
	setup() {
		const { FlowchartDraw } = useFlowchartDraw();
		const graphData = ref({
			nodes: [{
        shape: 'rect',
        x: 100,
        y: 40,
        width: 100,
        height: 40,
      }],
			edges: [],
		});

		return () => {
			return (
				<FlowchartDraw
					v-model={graphData.value}
					onChange={(data) => console.log("onChange", data)}
					style={{
						margin: 0,
						padding: 0,
						height: "100vh",
						width: "100%",
					}}
				/>
			);
		};
	},
});
