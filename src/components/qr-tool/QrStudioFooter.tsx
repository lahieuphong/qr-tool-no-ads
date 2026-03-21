"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function QrStudioFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-6 md:px-6 xl:px-8">
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.footer.copyright} {t.footer.madeBy}{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              lahieuphong
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}