import { defineComponent, ref } from 'vue';
import { useFlowchartDraw } from './components';
import type { GraphMetadata } from './components/init';

function genDummyNodes() {
  const nodes = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      const id = `test_${i}_${j}`;
      nodes.push({
        id: id,
        shape: 'stage-node',
        x: (i + 1) * 320,
        y: (i + j) * 120,
        width: 300,
        height: 100,
        name: id,
      });
    }
  }

  return nodes;
}

export default defineComponent({
  setup() {
    const { FlowchartDraw } = useFlowchartDraw();
    const graphData = ref<GraphMetadata>({
      nodes: genDummyNodes(),
      edges: [],
    });

    return () => {
      return (
        <FlowchartDraw
          v-model={graphData.value}
          onChange={data => console.log('onChange', data)}
          style={{
            margin: 0,
            padding: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        />
      );
    };
  },
});
