"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/qr-tool";

const BRAND_LOGO_SRC = "/logo/qr-tool.png";
const GITHUB_LOGO_SRC = "/logo/github.png";
const THEME_LIGHT_ICON_SRC = "/icon/theme-light.png";
const THEME_DARK_ICON_SRC = "/icon/theme-dark.png";

function BrandLogo() {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt="QR Tool No Ads"
      width={56}
      height={56}
      className="h-full w-full object-contain"
      priority
    />
  );
}

function GithubLogo({
  width = 48,
  height = 48,
  className = "h-8 w-8 object-contain",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={GITHUB_LOGO_SRC}
      alt="GitHub"
      width={width}
      height={height}
      className={className}
    />
  );
}

function ThemeModeIcon({
  isDark,
  className = "h-[18px] w-[18px] object-contain",
  width = 18,
  height = 18,
}: {
  isDark: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const src = isDark ? THEME_DARK_ICON_SRC : THEME_LIGHT_ICON_SRC;

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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 xl:px-8">
        <div className="flex items-center justify-between gap-3 py-3 sm:hidden">
          <a
            href="#qr-studio"
            className="min-w-0 flex flex-1 items-center gap-3 rounded-2xl transition hover:opacity-90"
          >
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
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
                lahieuphong
              </div>
            </div>
          </a>

          <div className="ml-auto flex shrink-0 items-center gap-2 p-1 transition-colors duration-300">
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleToggleLanguage}
                aria-label={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
                title={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
                className={cn(
                  "relative h-[28px] w-[64px] rounded-full border shadow-sm outline-none transition duration-300",
                  "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                  isEnglish
                    ? "border-rose-200 bg-gradient-to-r from-rose-300 to-rose-200"
                    : "border-sky-200 bg-gradient-to-r from-sky-300 to-sky-200"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300",
                    isEnglish ? "left-[36px]" : "left-[4px]"
                  )}
                >
                  <Image
                    src={isEnglish ? "/flags/us.png" : "/flags/vn.png"}
                    alt={isEnglish ? "English" : "Tiếng Việt"}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] rounded-full object-cover"
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
                title={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
                className={cn(
                  "relative h-[28px] w-[64px] rounded-full border shadow-sm outline-none transition duration-300",
                  "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                  isDark
                    ? "border-slate-400 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.35)]"
                    : "border-amber-200 bg-gradient-to-r from-amber-200 to-yellow-100"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-300",
                    isDark
                      ? "left-[36px] border border-slate-400 bg-slate-950 ring-1 ring-white/10"
                      : "left-[4px] bg-white"
                  )}
                >
                  <ThemeModeIcon isDark={isDark} />
                </span>
              </button>
            </div>

            <a
              href="https://github.com/lahieuphong/qr-tool-no-ads"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.header.github}
              title={t.header.github}
              className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-300 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <GithubLogo />
            </a>
          </div>
        </div>

        <div className="hidden min-h-[88px] items-center justify-between gap-6 py-4 sm:flex">
          <a
            href="#qr-studio"
            className="min-w-0 flex items-center gap-4 rounded-2xl transition hover:opacity-90"
          >
            <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
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
                La Hieu Phong
              </div>
            </div>
          </a>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
              title={isDark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"}
              className={cn(
                "relative h-[46px] w-[94px] rounded-full border shadow-sm outline-none transition duration-300 lg:w-[98px]",
                "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                isDark
                  ? "border-slate-400 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shadow-[0_8px_22px_rgba(15,23,42,0.35)]"
                  : "border-amber-200 bg-gradient-to-r from-amber-200 to-yellow-100"
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-300",
                  isDark
                    ? "left-[52px] border border-slate-400 bg-slate-950 ring-1 ring-white/10"
                    : "left-[4px] bg-white"
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

            <button
              type="button"
              onClick={handleToggleLanguage}
              aria-label={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
              title={isEnglish ? "Switch to Vietnamese" : "Switch to English"}
              className={cn(
                "relative h-[46px] w-[94px] rounded-full border shadow-sm outline-none transition duration-300 lg:w-[98px]",
                "focus-visible:ring-4 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700",
                isEnglish
                  ? "border-rose-200 bg-gradient-to-r from-rose-300 to-rose-200"
                  : "border-sky-200 bg-gradient-to-r from-sky-300 to-sky-200"
              )}
            >
              <span
                className={cn(
                  "absolute top-1/2 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300",
                  isEnglish ? "left-[52px]" : "left-[4px]"
                )}
              >
                <Image
                  src={isEnglish ? "/flags/us.png" : "/flags/vn.png"}
                  alt={isEnglish ? "English" : "Tiếng Việt"}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              </span>
            </button>

            <a
              href="https://github.com/lahieuphong/qr-tool-no-ads"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.header.github}
              title={t.header.github}
              className="inline-flex h-[46px] items-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <GithubLogo
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span>{t.header.github}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}