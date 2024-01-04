<script setup>
import { onMounted, ref } from 'vue';
import { bindEventHandlers, bindHotKeys, initX6 } from './init';

const graphContainer = ref(null);

/**
 * @type {import('@antv/x6').Graph}
 */
let GI = null;

onMounted(() => {
  GI = initX6(graphContainer.value);
  bindHotKeys(GI);
  bindEventHandlers(GI);
  console.log('initX6', GI);

  GI.addNode({
    shape: 'rect',
    x: 100,
    y: 40,
    width: 100,
    height: 40,
  });
});
</script>

<template>
  <div class="x-draw">
    <div ref="graphContainer" class="x-draw-board">x-draw-board</div>
    <div class="x-draw-left-top-toolbar">x-draw-left-top-toolbar</div>
    <div class="x-draw-right-top-toolbar">x-draw-right-top-toolbar</div>
    <div class="x-draw-left-bottom-toolbar">x-draw-left-bottom-toolbar</div>
    <div class="x-draw-right-bottom-toolbar">x-draw-right-bottom-toolbar</div>
  </div>
</template>

<style scoped>
.x-draw {
  position: relative;
  z-index: auto;

  --toolbar-height: 40px;

  .x-draw-board {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .x-draw-left-top-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    height: var(--toolbar-height);
  }

  .x-draw-right-top-toolbar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    height: var(--toolbar-height);
  }

  .x-draw-left-bottom-toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 20;
    height: var(--toolbar-height);
  }

  .x-draw-right-bottom-toolbar {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
    height: var(--toolbar-height);
  }
}
</style>
