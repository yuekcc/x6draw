import { defineComponent } from 'vue';
import XDraw from './components';

export default defineComponent({
  setup() {
    return () => {
      return (
        <XDraw
          style={{
            margin: 0,
            padding: 0,
            height: '100vh',
            width: '100%',
          }}
        />
      );
    };
  },
});
