import type { Graph } from '@antv/x6';
import { defineComponent, onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
import { initX6, type FlowchartDrawPlugin } from './init';
import { useCustomShapes } from './shapes';

import './style.css';

export default defineComponent({
  props: {
    tools: {
      type: Array as PropType<FlowchartDrawPlugin[]>,
      default: () => [],
    },
  },
  setup(props, { slots, expose }) {
    useCustomShapes();

    const graphContainer = ref<HTMLDivElement | null>(null);
    let GI: InstanceType<typeof Graph> | null = null;
    function cleanX6() {
      GI?.off();
      GI?.dispose();
      GI = null;
    }

    async function setupX6() {
      if (!graphContainer.value) {
        throw new Error('require x6 container');
      }

      if (GI !== null) {
        cleanX6();
      }

      GI = initX6(graphContainer.value);
      for (const addTool of props.tools) {
        if (GI) {
          await addTool(GI);
        }
      }
    }

    onMounted(() => {
      setupX6();
    });

    onBeforeUnmount(() => {
      cleanX6();
    });

    function getGraphInstance() {
      return GI;
    }

    expose({ getGraphInstance });

    return () => {
      return (
        <div class="flowchart-draw">
          <div ref={graphContainer} class="fd-board">
            {/* x6 mount point */}
          </div>
          <div class="fd-tl-toolbar">{slots.tlToolbar?.() || <span>tl</span>}</div>
          <div class="fd-tr-toolbar">{slots.trToolbar?.() || <span>tr</span>}</div>
          <div class="fd-bl-toolbar">{slots.blToolbar?.() || <span>bl</span>}</div>
          <div class="fd-br-toolbar">{slots.brToolbar?.() || <span>br</span>}</div>
        </div>
      );
    };
  },
});
