import { setupDevToolsPlugin } from '@vue/devtools-api';
import {
  type CustomInspectorNode,
  type PluginDescriptor,
} from '@vue/devtools-kit';
import { type App, type ShallowRef, onScopeDispose, toRaw } from 'vue';

const INSPECTOR_ID = 'element-hooks';

export interface HookMetadata {
  name?: string;
  internal?: boolean;
}

export const HOOK_METADATA: unique symbol = Symbol('hook-metadata');

export type HookOptions = {
  [HOOK_METADATA]?: HookMetadata;
};

const hookRegistry = new Map<string, Set<ShallowRef<object | null>>>();

interface InspectorApi {
  sendInspectorTree(id: string): void;
  sendInspectorState(id: string): void;
}

const inspector = {
  api: null as InspectorApi | null,

  init(api: InspectorApi) {
    this.api = api;
  },

  sendTree() {
    this.api?.sendInspectorTree(INSPECTOR_ID);
  },

  sendState() {
    this.api?.sendInspectorState(INSPECTOR_ID);
  },
};

export function useDevtools(name: string, state: ShallowRef<object | null>) {
  if (!hookRegistry.has(name)) {
    hookRegistry.set(name, new Set());
  }
  const set = hookRegistry.get(name)!;

  set.add(state);
  inspector.sendTree();

  onScopeDispose(() => {
    set.delete(state);

    if (set.size === 0) {
      hookRegistry.delete(name);
    }
    inspector.sendTree();
  });
}

export function setupDevtools(app: App) {
  const descriptor = {
    id: 'element-hooks',
    label: 'Element Hooks',
    packageName: 'element-hooks',
    homepage: 'https://element-hooks.js.org',
    app: app as PluginDescriptor['app'],
    logo: '/images/logo.svg',
    enableEarlyProxy: true,
  } satisfies PluginDescriptor;

  setupDevToolsPlugin(descriptor, api => {
    api.addInspector({
      id: INSPECTOR_ID,
      label: 'Element Hooks',
      icon: 'widgets',
      treeFilterPlaceholder: 'Search hooks',
    });

    inspector.init(api);

    api.on.getInspectorTree(payload => {
      if (payload.inspectorId !== INSPECTOR_ID) {
        return;
      }
      const filter = payload.filter?.toLowerCase() ?? '';
      const nodes: CustomInspectorNode[] = [];

      for (const [name, set] of hookRegistry) {
        for (let index = 1; index <= set.size; index++) {
          const label = `${name} #${index}`;

          if (!filter || label.toLowerCase().includes(filter)) {
            nodes.push({ id: `${name}:${index}`, label });
          }
        }
      }
      payload.rootNodes = nodes;
    });

    api.on.getInspectorState(payload => {
      if (payload.inspectorId !== INSPECTOR_ID) {
        return;
      }
      const [name, index] = payload.nodeId.split(':');
      const set = hookRegistry.get(name);

      if (!set) {
        return;
      }
      const stateRef = [...set][Number(index) - 1];

      if (!stateRef) {
        return;
      }
      const raw = toRaw(stateRef.value) ?? {};

      payload.state = {
        State: Object.entries(raw).map(([key, value]) => ({
          key,
          value: toRaw(value),
        })),
      };
    });
  });
}
