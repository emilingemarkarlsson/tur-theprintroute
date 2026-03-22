import { useEffect, useState } from 'react';

const LISTMONK_URL = 'https://listmonk-v8wk0kksk00wgk0g0c4wsww0.46.62.206.47.sslip.io/subscription/form';
const LIST_UUID = '9725bc88-729a-4344-99d2-5866a2d7b26b';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('tpr-announcement-dismissed')) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem('tpr-announcement-dismissed', '1');
  }

  if (!visible) return null;

  return (
    <div className="w-full border-b border-gray-200 bg-white text-sm">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-3 px-4 py-2 sm:flex-nowrap">
        <span className="min-w-0 flex-1 text-xs text-gray-600">
          Print fulfilment, routing and automation — updates straight to your inbox.
        </span>
        <form
          action={LISTMONK_URL}
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 gap-2"
        >
          <input type="hidden" name="l" value={LIST_UUID} />
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="h-7 w-40 rounded border border-gray-300 bg-white px-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="h-7 whitespace-nowrap rounded bg-indigo-600 px-3 text-xs font-semibold text-white hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-gray-400 transition-colors hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
