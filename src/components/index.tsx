import { PropType, defineComponent } from 'vue';
import FlowchartDrawImpl from './FlowchartDrawImpl';
import { bindHotKeys, bindChangeEvents, FlowchartDrawPlugin, GraphData } from './init';

const zoomAndFit: FlowchartDrawPlugin = gi => {
  gi.zoomToFit();
};

export function useFlowchartDraw() {
  const Wrapped = defineComponent({
    props: {
      modelValue: {
        type: Object as PropType<GraphData>,
        required: true,
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const wrappedEventHandlers: FlowchartDrawPlugin = gi => {
        bindChangeEvents(gi, graphData => {
          emit('change', graphData);
        });
      };
      const flowchartDrawPlugins = [bindHotKeys, wrappedEventHandlers, zoomAndFit];
      return () => <FlowchartDrawImpl plugins={flowchartDrawPlugins} />;
    },
  });

  return {
    FlowchartDraw: Wrapped,
  };
}
