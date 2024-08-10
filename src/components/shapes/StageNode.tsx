import type { Shape } from '@antv/x6';
import { defineComponent, nextTick, onUnmounted, render } from 'vue';
import styles from './StageNode.module.css';

const StageNode = defineComponent(
  props => {
    onUnmounted(() => {
      console.log(`unmounted ${props.name}`);
    });

    return () => {
      return (
        <div class={styles.stageNode}>
          <div class={styles.name}>{props.name}</div>
          <div class={styles.content}>{/* 占位 */}</div>
        </div>
      );
    };
  },
  { props: { name: { type: String } } },
);

export default function addStageNode(cached: Map<string, HTMLDivElement>): Shape.HTML.HTMLShapeConfig {
  return {
    shape: 'stage-node',
    width: 1000,
    height: 200,
    html(cell) {
      let div: HTMLDivElement | undefined = cached.get(cell.id);
      if (div) {
        render(null, div);
      } else {
        div = document.createElement('div');
        div.style.height = '100%';
        div.style.width = '100%';
      }

      const { name } = cell.getData();
      nextTick(() => {
        render(<StageNode name={name} />, div);
        cached;
      });

      return div;
    },
  };
}
