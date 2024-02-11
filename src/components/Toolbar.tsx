import { defineComponent, type DefineComponent } from 'vue';
import { ToolbarItem } from './types';

interface Props {
  buttons: Array<ToolbarItem>;
}

export const Toolbar = defineComponent(
  (props: Props) => {
    const buttonNodes = props.buttons.map(config => {
      const Icon = config.icon;
      return (
        <div onClick={() => config.onClick()} title={config.label}>
          <Icon />
        </div>
      );
    });

    return () => <div class={'toolbar'}>{buttonNodes}</div>;
  },
  { props: ['buttons'] },
);
