import { Graph } from '@antv/x6';
import { defineComponent, onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
import { initX6, type FlowchartDrawPlugin } from './init';

import './style.css';

export default defineComponent({
  props: {
    plugins: {
      type: Array as PropType<FlowchartDrawPlugin[]>,
      default: () => []
    },
  },
  setup(props, { slots, expose }) {
    const graphContainer = ref<HTMLDivElement | null>(null);
    let GI: InstanceType<typeof Graph> | null = null;

    async function setupX6() {
      if (!graphContainer.value) {
        throw new Error('require x6 container');
      }

      if (GI !== null) {
        GI.off();
        GI.dispose();
        GI = null;
      }

      GI = initX6(graphContainer.value);
      for(const install of props.plugins) {
        await install(GI)
      }
    }

    onMounted(() => {
      setupX6();

    });

    onBeforeUnmount(() => {
      GI?.off();
      GI?.dispose();
      GI = null;
    });

    function getGraphInstance() {
      return GI;
    }

    expose({ getGraphInstance });

    return () => {
      return (
        <div class="x-draw">
          <div ref={graphContainer} class="x-draw-board">
            x-draw-board
          </div>
          <div class="x-draw-left-top-toolbar">x-draw-left-top-toolbar</div>
          <div class="x-draw-right-top-toolbar">x-draw-right-top-toolbar</div>
          <div class="x-draw-left-bottom-toolbar">x-draw-left-bottom-toolbar</div>
          <div class="x-draw-right-bottom-toolbar">x-draw-right-bottom-toolbar</div>
        </div>
      );
    };
  },
});
