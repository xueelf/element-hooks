import {
  type ElMessageBoxShortcutMethod,
  type MessageBoxInputData,
  ElMessageBox,
} from 'element-plus';

type MessageBoxMethodParams = ElMessageBoxShortcutMethod extends {
  (...args: infer A): unknown;
  (...args: infer B): unknown;
}
  ? A | B
  : never;

/**
 * ElMessageBox 会在点击关闭时返回一个 rejected 的 Promise，导致抛出异常。
 * 这里对 confirm 和 prompt 方法进行了封装，方便直接使用 await 处理。
 */
export function useMessageBox() {
  return {
    alert: ElMessageBox.alert,
    confirm: async (...args: MessageBoxMethodParams): Promise<boolean> => {
      try {
        await Reflect.apply(ElMessageBox.confirm, null, args);
        return true;
      } catch {
        return false;
      }
    },
    prompt: async (...args: MessageBoxMethodParams): Promise<string | null> => {
      try {
        const { value }: MessageBoxInputData = await Reflect.apply(
          ElMessageBox.prompt,
          null,
          args,
        );
        return value;
      } catch {
        return null;
      }
    },
  };
}
