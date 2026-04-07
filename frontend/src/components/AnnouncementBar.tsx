import { useEffect, useState } from 'react';

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
    <div className="w-full border-b border-sky-900/60 bg-sky-950/80 text-sm">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-3 px-4 py-2 sm:flex-nowrap">
        <span className="min-w-0 flex-1 text-xs text-sky-200">
          🚀 The app is live — start routing print orders today at{" "}
          <a
            href="https://app.theprintroute.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-white transition-colors"
          >
            app.theprintroute.com
          </a>
        </span>
        <a
          href="https://app.theprintroute.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded bg-sky-500 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-400 transition-colors"
        >
          Open app →
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-sky-500 transition-colors hover:text-sky-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
