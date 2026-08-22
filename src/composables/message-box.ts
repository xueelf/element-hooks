import {
  type ElMessageBoxOptions,
  type MessageBoxInputData,
  ElMessageBox,
} from 'element-plus';
import { type AppContext } from 'vue';

type MessageBoxOptions = Omit<ElMessageBoxOptions, 'callback'> & {
  callback?: never;
};

type MessageBoxMethodParams =
  | [
      message: ElMessageBoxOptions['message'],
      options?: MessageBoxOptions,
      appContext?: AppContext | null,
    ]
  | [
      message: ElMessageBoxOptions['message'],
      title: ElMessageBoxOptions['title'],
      options?: MessageBoxOptions,
      appContext?: AppContext | null,
    ];

function isCanceled(error: unknown) {
  return error === 'cancel' || error === 'close';
}

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
      } catch (error) {
        if (isCanceled(error)) {
          return false;
        }
        throw error;
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
      } catch (error) {
        if (isCanceled(error)) {
          return null;
        }
        throw error;
      }
    },
  };
}
