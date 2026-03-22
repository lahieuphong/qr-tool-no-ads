"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { APP_AUTHOR, APP_LINKS } from "@/lib/app-config";

export default function QrStudioFooter() {
  const { t } = useLanguage();

  return (
    /* PC + Mobile: footer dùng chung */
    <footer className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-6 md:px-6 xl:px-8">
        {/* Mobile: padding gọn hơn */}
        {/* PC: tăng padding ngang theo breakpoint */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.footer.copyright} {t.footer.madeBy}{" "}
            <a
              href={APP_LINKS.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-900 hover:decoration-slate-500 dark:text-slate-200 dark:decoration-slate-600 dark:hover:text-white dark:hover:decoration-slate-300"
              aria-label={`GitHub ${APP_AUTHOR}`}
              title={APP_LINKS.githubProfile}
            >
              {APP_AUTHOR}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}