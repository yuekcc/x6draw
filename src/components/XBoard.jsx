import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { bindEventHandlers, bindHotKeys, initX6 } from './init';

import './style.css';

export default defineComponent({
  setup() {
    const graphContainer = ref(null);

    /**
     * @type {import('@antv/x6').Graph}
     */
    let GI = null;

    onMounted(() => {
      GI = initX6(graphContainer.value);
      bindHotKeys(GI);
      bindEventHandlers(GI);

      GI.addNode({
        shape: 'rect',
        x: 100,
        y: 40,
        width: 100,
        height: 40,
      });
    });

    onBeforeUnmount(() => {
      GI = null;
    });

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
