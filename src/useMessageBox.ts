import {
  type ElMessageBoxShortcutMethod,
  type MessageBoxInputData,
  ElMessageBox,
} from 'element-plus';

/**
 * ElMessageBox 会在点击关闭时返回一个 rejected 的 Promise，导致抛出异常。
 * 这里对 confirm 和 prompt 方法进行了封装，方便直接使用 await 处理。
 */
export function useMessageBox() {
  return {
    alert: ElMessageBox.alert,
    confirm: async (
      ...args: Parameters<ElMessageBoxShortcutMethod>
    ): Promise<boolean> => {
      try {
        await ElMessageBox.confirm(...args);
        return true;
      } catch {
        return false;
      }
    },
    prompt: async (
      ...args: Parameters<ElMessageBoxShortcutMethod>
    ): Promise<string | null> => {
      try {
        const { value } = <MessageBoxInputData>(
          await ElMessageBox.prompt(...args)
        );
        return value;
      } catch {
        return null;
      }
    },
  };
}
