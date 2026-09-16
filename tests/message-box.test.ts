import { expectTypeOf, test } from 'bun:test';

import { type AppContext } from 'vue';

import { type useMessageBox } from '#/composables/message-box';

type MessageBox = ReturnType<typeof useMessageBox>;
type Options = { confirmButtonText: string };
type CallbackOptions = { callback: () => void };
type ValidParams =
  | [string]
  | [string, Options]
  | [string, Options, AppContext]
  | [string, string, Options, AppContext]
  | [string, undefined, Options, null];

test('确认框不接受回调', () => {
  type Params = Parameters<MessageBox['confirm']>;

  expectTypeOf<ValidParams>().toExtend<Params>();
  expectTypeOf<[string, CallbackOptions]>().not.toExtend<Params>();
  expectTypeOf<[string, string, CallbackOptions]>().not.toExtend<Params>();
});

test('输入框不接受回调', () => {
  type Params = Parameters<MessageBox['prompt']>;

  expectTypeOf<ValidParams>().toExtend<Params>();
  expectTypeOf<[string, CallbackOptions]>().not.toExtend<Params>();
  expectTypeOf<[string, string, CallbackOptions]>().not.toExtend<Params>();
});
