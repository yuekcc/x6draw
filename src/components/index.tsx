import { PropType, defineComponent, ref } from 'vue';
import FlowchartDrawImpl from './FlowchartDrawImpl';
import { DownloadIcon } from './icon/DownloadIcon';
import { bindChangeEvents, bindHotKeys, type FlowchartDrawPlugin, type GraphMetadata } from './init';

const zoomAndFit: FlowchartDrawPlugin = gi => {
  gi.zoomTo(1);
  gi.centerContent();
};

export function useFlowchartDraw() {
  const Wrapped = defineComponent({
    props: {
      modelValue: {
        type: Object as PropType<GraphMetadata>,
        required: true,
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const lastEmitChangeAt = ref('N/A');
      const flowchartRef = ref<InstanceType<typeof FlowchartDrawImpl>>();

      function downloadGraphJson() {
        const { cells } = flowchartRef.value?.getGraphInstance()?.toJSON();
        const nodes = cells.filter(it => it.shape !== 'edge');
        const edges = cells.filter(it => it.shape === 'edge');
        const graphData = { nodes, edges };
        console.log('downloadGraphJson graphData =', graphData);
      }

      const wrappedEventHandlers: FlowchartDrawPlugin = gi => {
        bindChangeEvents(gi, graphData => {
          emit('change', graphData);
          lastEmitChangeAt.value = new Date().toLocaleString();
        });
      };

      const renderModelValue: FlowchartDrawPlugin = gi => {
        const nodes = props.modelValue.nodes.map(it => gi.createNode(it));
        const edges = props.modelValue.edges.map(it => gi.createEdge(it));

        gi.resetCells([...nodes, ...edges]);
      };

      const flowchartDrawPlugins = [bindHotKeys, wrappedEventHandlers, renderModelValue, zoomAndFit];
      return () => (
        <FlowchartDrawImpl
          ref={flowchartRef}
          plugins={flowchartDrawPlugins}
          v-slots={{
            blToolbar() {
              return <span>{`Saved at ${lastEmitChangeAt.value}`}</span>;
            },
            brToolbar() {
              return (
                <span onClick={downloadGraphJson}>
                  <DownloadIcon />
                </span>
              );
            },
          }}
        />
      );
    },
  });

  return {
    FlowchartDraw: Wrapped,
  };
}
