"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import { APP_ASSETS, APP_AUTHOR, APP_LINKS } from "@/lib/app-config";
import { cn } from "@/lib/qr-tool";

function BrandLogo() {
  return (
    <Image
      src={APP_ASSETS.brandLogo}
      alt="QR Tool No Ads"
      width={56}
      height={56}
      className="h-full w-full object-contain"
      priority
      unoptimized
    />
  );
}

function GithubLogo({
  width = 52,
  height = 52,
  className = "h-10 w-10 object-cover",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={APP_ASSETS.githubLogo}
      alt="GitHub"
      width={width}
      height={height}
      className={className}
      unoptimized
    />
  );
}

function ThemeModeIcon({
  isDark,
  className = "h-4.5 w-4.5 object-contain",
  width = 18,
  height = 18,
}: {
  isDark: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const src = isDark ? APP_ASSETS.themeDarkIcon : APP_ASSETS.themeLightIcon;

  return (
    <img
      src={src}
      alt={isDark ? "Dark mode" : "Light mode"}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
}

export default function QrStudioHeader() {
  const { lang, setLang, t } = useLanguage();
  const { isDark, toggleTheme } = useThemeMode();

  const isEnglish = lang === "en";

  const handleToggleLanguage = () => {
    setLang(isEnglish ? "vi" : "en");
  };

  return (
    /* PC + Mobile: sticky header dùng chung */
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 xl:px-8">
        {/* Mobile: compact header dưới sm */}
        <div className="flex items-center justify-between gap-3 py-3 sm:hidden">
          <a
            href={APP_LINKS.qrStudioAnchor}
            className="min-w-0 flex flex-1 items-center gap-3 rounded-2xl transition hover:opacity-90"
          >
            <div className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
              <BrandLogo />
            </div>

            <div className="min-w-0">
              <div className="truncate text-[20px] font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white">
                QR Tool
              </div>
              <div className="truncate text-[20px] font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white">
                No Ads
              </div>
              <div className="mt-1 truncate text-[11px] font-medium uppercase leading-[1.1] tracking-[0.12em] text-slate-400 dark:text-slate-500">
                {APP_AUTHOR}
              </div>
            </div>
          </a>

          <div className="ml-auto flex shrink-0 items-center gap-2 p-1 transition-colors duration-300">
            {/* Mobile: 2 toggle xếp dọc */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleToggleLanguage}
                aria-label={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
                title={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
                className={cn(
                  "relative h-7 w-16 rounded-full border shadow-sm outline-none transition duration-300",
                  "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                  isEnglish
                    ? "border-rose-200 bg-linear-to-r from-rose-300 to-rose-200"
                    : "border-sky-200 bg-linear-to-r from-sky-300 to-sky-200"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300",
                    isEnglish ? "left-9" : "left-1"
                  )}
                >
                  <Image
                    src={isEnglish ? APP_ASSETS.flagEnglish : APP_ASSETS.flagVietnam}
                    alt={isEnglish ? "English" : "Tiếng Việt"}
                    width={18}
                    height={18}
                    className="h-4.5 w-4.5 rounded-full object-cover"
                    unoptimized
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
                title={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
                className={cn(
                  "relative h-7 w-16 rounded-full border shadow-sm outline-none transition duration-300",
                  "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                  isDark
                    ? "border-slate-400 bg-linear-to-r from-slate-700 via-slate-600 to-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.35)]"
                    : "border-amber-200 bg-linear-to-r from-amber-200 to-yellow-100"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all duration-300",
                    isDark
                      ? "left-9 border-slate-200 bg-white ring-1 ring-white/70"
                      : "left-1 border-slate-200 bg-white"
                  )}
                >
                  <ThemeModeIcon isDark={isDark} />
                </span>
              </button>
            </div>

            {/* Mobile: nút GitHub vuông bo góc giống logo bên trái, cùng kích thước */}
            <a
              href={APP_LINKS.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.header.github}
              title={t.header.github}
              className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <span className="flex h-10.5 w-10.5 items-center justify-center overflow-hidden rounded-xl">
                <GithubLogo
                  width={42}
                  height={42}
                  className="h-10.5 w-10.5 object-cover"
                />
              </span>
            </a>
          </div>
        </div>

        {/* PC: expanded header từ sm trở lên */}
        <div className="hidden min-h-22 items-center justify-between gap-6 py-4 sm:flex">
          <a
            href={APP_LINKS.qrStudioAnchor}
            className="min-w-0 flex items-center gap-4 rounded-2xl transition hover:opacity-90"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
              <BrandLogo />
            </div>

            <div className="min-w-0">
              <div className="truncate text-[20px] font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white lg:text-[22px]">
                QR Tool No Ads
              </div>
              <div className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400 lg:text-[15px]">
                {t.header.brandSub}
              </div>
              <div className="mt-1 truncate text-[11px] font-medium uppercase leading-[1.1] tracking-[0.12em] text-slate-400 dark:text-slate-500">
                {APP_AUTHOR}
              </div>
            </div>
          </a>

          <div className="flex shrink-0 items-center gap-3">
            {/* PC: toggle theme lớn */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
              title={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
              className={cn(
                "relative h-11.5 w-23.5 rounded-full border shadow-sm outline-none transition duration-300 lg:w-24.5",
                "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                isDark
                  ? "border-slate-400 bg-linear-to-r from-slate-700 via-slate-600 to-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.35)]"
                  : "border-amber-200 bg-linear-to-r from-amber-200 to-yellow-100"
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 flex h-9.5 w-9.5 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all duration-300",
                  isDark
                    ? "left-13 border-slate-200 bg-white ring-1 ring-white/70"
                    : "left-1 border-slate-200 bg-white"
                )}
              >
                <ThemeModeIcon
                  isDark={isDark}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
            </button>

            {/* PC: toggle language lớn */}
            <button
              type="button"
              onClick={handleToggleLanguage}
              aria-label={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
              title={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
              className={cn(
                "relative h-11.5 w-23.5 rounded-full border shadow-sm outline-none transition duration-300 lg:w-24.5",
                "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                isEnglish
                  ? "border-rose-200 bg-linear-to-r from-rose-300 to-rose-200"
                  : "border-sky-200 bg-linear-to-r from-sky-300 to-sky-200"
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 flex h-9.5 w-9.5 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300",
                  isEnglish ? "left-13" : "left-1"
                )}
              >
                <Image
                  src={isEnglish ? APP_ASSETS.flagEnglish : APP_ASSETS.flagVietnam}
                  alt={isEnglish ? "English" : "Tiếng Việt"}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                  unoptimized
                />
              </span>
            </button>

            {/* PC: GitHub button icon lớn hơn, bo tròn hơn */}
            <a
              href={APP_LINKS.githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.header.github}
              title={t.header.github}
              className="inline-flex h-11.5 items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
                <GithubLogo
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </span>
              <span>{t.header.github}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}