import { DefineComponent, PropType, defineComponent, ref } from 'vue';
import FlowchartDrawImpl from './FlowchartDrawImpl';
import { DownloadIcon } from './icon/DownloadIcon';
import { bindChangeEvents, bindHotKeys, type FlowchartDrawPlugin, type GraphMetadata } from './init';
import { ToolbarItem } from './types';
import { Graph } from '@antv/x6';
import { Toolbar } from './Toolbar';

const zoomAndFit: FlowchartDrawPlugin = gi => {
  gi.zoomTo(1);
  gi.centerContent();
};

function useBrToolbar(getGraphInstance: () => Graph) {
  const config: Array<ToolbarItem> = [
    {
      label: 'Download',
      icon: DownloadIcon as any as DefineComponent<any, any, any>,
      onClick: () => {
        const { cells } = getGraphInstance().toJSON();
        const nodes = cells.filter(it => it.shape !== 'edge');
        const edges = cells.filter(it => it.shape === 'edge');
        const graphData = { nodes, edges };
        console.log('downloadGraphJson graphData =', graphData);
      },
    },
  ];

  return () => {
    const buttons_ = config
    return <Toolbar buttons={buttons_} />
  };
}

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

      const BrToolbar = useBrToolbar(() => flowchartRef.value?.getGraphInstance() as Graph);

      const wrappedEventHandlers: FlowchartDrawPlugin = gi => {
        bindChangeEvents(gi, graphData => {
          emit('change', graphData);
          lastEmitChangeAt.value = new Date().toLocaleString();
        });
      };

      const renderModelValue: FlowchartDrawPlugin = gi => {
        const onRenderDone = () => {
          console.log('render:done');

          setTimeout(() => gi.off('render:done', onRenderDone), 0);
        };
        gi.on('render:done', onRenderDone);

        const nodes = props.modelValue.nodes.map(it => gi.createNode(it));
        const edges = props.modelValue.edges.map(it => gi.createEdge(it));
        gi.resetCells([...nodes, ...edges]);
      };

      const tools = [bindHotKeys, wrappedEventHandlers, renderModelValue, zoomAndFit];
      return () => (
        <FlowchartDrawImpl
          ref={flowchartRef}
          tools={tools}
          v-slots={{
            blToolbar() {
              return <span>{`Saved at ${lastEmitChangeAt.value}`}</span>;
            },
            brToolbar() {
              return <BrToolbar />;
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
