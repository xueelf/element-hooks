import { type AppContext } from 'vue';

import { type useMessageBox } from '#/composables/message-box';

// Checked by `bun run typecheck`; this function is never executed.
export function checkMessageBoxTypes(
  { alert, confirm, prompt }: ReturnType<typeof useMessageBox>,
  appContext: AppContext,
) {
  const options = { confirmButtonText: 'Continue' };
  const callback = () => undefined;

  confirm('message');
  confirm('message', options);
  confirm('message', options, appContext);
  confirm('message', 'title', options, appContext);
  confirm('message', undefined, options, null);
  prompt('message');
  prompt('message', options);
  prompt('message', options, appContext);
  prompt('message', 'title', options, appContext);
  prompt('message', undefined, options, null);
  alert('message', { callback });

  // @ts-expect-error confirm does not support callback without a title.
  confirm('message', { callback });
  // @ts-expect-error confirm does not support callback with a title.
  confirm('message', 'title', { callback });
  // @ts-expect-error prompt does not support callback without a title.
  prompt('message', { callback });
  // @ts-expect-error prompt does not support callback with a title.
  prompt('message', 'title', { callback });
}
