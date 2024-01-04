import { Graph } from '@antv/x6';

const defaultOptions = {
  panning: true,
  mousewheel: true,
  background: {
    color: '#F2F7FA',
  },
  grid: {
    visible: true,
    size: 20,
    type: 'fixedDot',
    args: {
      color: '#a0a0a0', // 网点颜色
      thickness: 2, // 网点大小
    },
  },
};

export function initX6(container) {
  const graph = new Graph({
    ...defaultOptions,
    container,
  });

  return graph;
}

/**
 * 绑定快捷键
 * @param {import('@antv/x6').Graph} gi
 */
export function bindHotKeys(gi) {}

/**
 * 绑定事件处理器
 * @param {import('@antv/x6').Graph} gi
 */
export function bindEventHandlers(gi) {}
