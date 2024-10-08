import { defineComponent } from 'vue';
import type { ToolbarItem } from './types';

interface Props {
  buttons: Array<ToolbarItem>;
}

export const Toolbar = defineComponent(
  (props: Props) => {
    const buttonNodes = props.buttons.map(config => {
      const Render = config.render;
      if (Render && typeof Render === 'function') {
        return <Render {...config} />;
      }

      const Icon = config.icon;
      return (
        <div onClick={() => config.onClick()} title={config.label} key={config.label}>
          <Icon />
        </div>
      );
    });

    return () => <div class={'toolbar'}>{buttonNodes}</div>;
  },
  { props: ['buttons'] },
);
