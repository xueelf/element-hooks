import { setupDevToolsPlugin } from '@vue/devtools-api';
import {
  type App,
  type ComponentInternalInstance,
  type Ref,
  getCurrentInstance,
  toRaw,
} from 'vue';

const STATE_TYPE = 'Element Hooks';
const componentStates = new WeakMap<
  ComponentInternalInstance,
  Readonly<Ref<object>>
>();

export function useDevtools(state: Readonly<Ref<object>>) {
  const instance = getCurrentInstance();

  if (instance) {
    componentStates.set(instance, state);
  }
}

export function setupDevtools(app: App) {
  setupDevToolsPlugin(
    {
      id: 'element-hooks',
      label: STATE_TYPE,
      packageName: 'element-hooks',
      app,
      componentStateTypes: [STATE_TYPE],
    },
    api => {
      api.on.inspectComponent(payload => {
        if (payload.app !== app) {
          return;
        }
        const state = componentStates.get(payload.componentInstance);

        if (!state) {
          return;
        }
        payload.instanceData.state.push(
          ...Object.entries(state.value).map(([key, value]) => ({
            type: STATE_TYPE,
            key,
            value: toRaw(value),
            editable: false,
          })),
        );
      });
    },
  );
}
