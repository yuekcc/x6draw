import { Shape } from '@antv/x6';
import { onUnmounted, render } from 'vue';
import addStageNode from './StageNode';

const cached = new Map<string, HTMLDivElement>();

function addCustomShapes() {
  Shape.HTML.register(addStageNode(cached));
}

function dispose() {
  for (const div of cached.values()) {
    render(null, div);
  }

  cached.clear();
}

export function useCustomShapes() {
  addCustomShapes();
  onUnmounted(() => {
    dispose();
  });
}
