"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useQrStudio } from "@/hooks/useQrStudio";
import { QUALITY_OPTIONS, cn, isHexColor } from "@/lib/qr-tool";

export default function QrStudio() {
  const { t } = useLanguage();

  const {
    url,
    setUrl,
    fileName,
    setFileName,
    size,
    setSize,
    margin,
    setMargin,
    errorLevel,
    setErrorLevel,
    quality,
    setQuality,
    outputWidth,
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    fgColorInput,
    setFgColorInput,
    bgColorInput,
    setBgColorInput,
    isFgColorInputValid,
    isBgColorInputValid,
    recentUrls,
    qrPng,
    qrSvg,
    error,
    hydrated,
    normalizedPreview,
    hasUrl,
    isUrlReady,
    isGenerating,
    generatedUrl,
    downloadPng,
    downloadSvg,
    copyUrl,
    printQr,
    clearForm,
    removeRecent,
  } = useQrStudio();

  const localizedQualityOptions = QUALITY_OPTIONS.map((item) => ({
    ...item,
    label: t.qrStudio.qualityOptions[item.value].label,
    description: t.qrStudio.qualityOptions[item.value].description,
  }));

  const autoStatusText = !hydrated
    ? t.qrStudio.status.loading
    : !hasUrl
    ? t.qrStudio.status.waiting
    : !isUrlReady
    ? t.qrStudio.status.invalid
    : isGenerating
    ? t.qrStudio.status.generating
    : generatedUrl
    ? t.qrStudio.status.updated
    : t.qrStudio.status.ready;

  const autoStatusClass = !hydrated || !hasUrl
    ? "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
    : !isUrlReady
    ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
    : isGenerating
    ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
    : generatedUrl
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
    : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 xl:px-8">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:mb-6 sm:rounded-3xl sm:px-6 sm:py-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <h1 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl md:text-3xl">
              {t.hero.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] xl:items-stretch xl:gap-6">
          <section className="order-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:rounded-3xl sm:p-6 xl:order-none xl:row-span-2">
            <div className="mb-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">
                  {t.qrStudio.config.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t.qrStudio.config.subtitle}
                </p>
              </div>

              <div className="flex justify-center sm:block">
                <div
                  className={cn(
                    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    autoStatusClass
                  )}
                >
                  {autoStatusText}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.fields.websiteUrl}
                </label>

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://lahieuphong.github.io/qr-tool-no-ads/"
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800 sm:text-base"
                />

                <div className="mt-3">
                  {!hasUrl ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t.qrStudio.fields.autoAddHttps}
                    </div>
                  ) : normalizedPreview ? (
                    <div className="flex flex-col items-center">
                      <a
                        href={isUrlReady ? normalizedPreview : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "block w-full rounded-full border px-4 py-2.5 text-sm transition",
                          isUrlReady
                            ? "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
                            : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                        )}
                        title={normalizedPreview}
                        aria-label={`Open link ${normalizedPreview}`}
                      >
                        <span className="block truncate text-center">
                          {normalizedPreview}
                        </span>
                      </a>

                      <div className="mt-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                        {isUrlReady
                          ? t.qrStudio.fields.validLinkAutoUpdate
                          : t.qrStudio.fields.invalidLink}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.fields.downloadFileName}
                </label>

                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder={t.qrStudio.fields.downloadFilePlaceholder}
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800 sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4 md:p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t.qrStudio.fields.qrColor}
                    </label>
                    <span className="inline-flex min-w-[92px] items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-300 sm:px-3 sm:text-xs">
                      {t.qrStudio.fields.foreground}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="group relative block h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 sm:h-12 sm:w-12">
                      <span
                        className="block h-full w-full rounded-xl border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: fgColor }}
                      />
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => {
                          setFgColor(e.target.value);
                          setFgColorInput(e.target.value.toUpperCase());
                        }}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </label>

                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "flex h-11 items-center rounded-2xl border bg-white px-3 shadow-sm transition dark:bg-slate-900 sm:h-12 sm:px-4",
                          isFgColorInputValid
                            ? "border-slate-200 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 dark:border-slate-700 dark:focus-within:border-slate-500 dark:focus-within:ring-slate-800"
                            : "border-red-200 focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 dark:border-red-800 dark:focus-within:border-red-700 dark:focus-within:ring-red-950/40"
                        )}
                      >
                        <span className="mr-2 text-xs font-semibold text-slate-400 dark:text-slate-500 sm:text-sm">
                          #
                        </span>
                        <input
                          type="text"
                          value={fgColorInput.replace(/^#/, "")}
                          onChange={(e) => {
                            const raw = e.target.value
                              .toUpperCase()
                              .replace(/[^0-9A-F]/g, "");
                            const nextValue = `#${raw}`;
                            setFgColorInput(nextValue);

                            if (isHexColor(nextValue)) {
                              setFgColor(nextValue);
                            }
                          }}
                          maxLength={8}
                          placeholder="111827"
                          className={cn(
                            "w-full min-w-0 bg-transparent text-sm font-semibold tracking-[0.04em] outline-none sm:text-base",
                            isFgColorInputValid
                              ? "text-slate-900 dark:text-slate-100"
                              : "text-red-600 dark:text-red-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {!isFgColorInputValid && (
                    <p className="mt-2 text-[11px] text-red-600 dark:text-red-400 sm:text-xs">
                      {t.qrStudio.fields.invalidHex}
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4 md:p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t.qrStudio.fields.backgroundColor}
                    </label>
                    <span className="inline-flex min-w-[92px] items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-300 sm:px-3 sm:text-xs">
                      {t.qrStudio.fields.background}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="group relative block h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 sm:h-12 sm:w-12">
                      <span
                        className="block h-full w-full rounded-xl border border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: bgColor }}
                      />
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setBgColorInput(e.target.value.toUpperCase());
                        }}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </label>

                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "flex h-11 items-center rounded-2xl border bg-white px-3 shadow-sm transition dark:bg-slate-900 sm:h-12 sm:px-4",
                          isBgColorInputValid
                            ? "border-slate-200 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 dark:border-slate-700 dark:focus-within:border-slate-500 dark:focus-within:ring-slate-800"
                            : "border-red-200 focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 dark:border-red-800 dark:focus-within:border-red-700 dark:focus-within:ring-red-950/40"
                        )}
                      >
                        <span className="mr-2 text-xs font-semibold text-slate-400 dark:text-slate-500 sm:text-sm">
                          #
                        </span>
                        <input
                          type="text"
                          value={bgColorInput.replace(/^#/, "")}
                          onChange={(e) => {
                            const raw = e.target.value
                              .toUpperCase()
                              .replace(/[^0-9A-F]/g, "");
                            const nextValue = `#${raw}`;
                            setBgColorInput(nextValue);

                            if (isHexColor(nextValue)) {
                              setBgColor(nextValue);
                            }
                          }}
                          maxLength={8}
                          placeholder="FFFFFF"
                          className={cn(
                            "w-full min-w-0 bg-transparent text-sm font-semibold tracking-[0.04em] outline-none sm:text-base",
                            isBgColorInputValid
                              ? "text-slate-900 dark:text-slate-100"
                              : "text-red-600 dark:text-red-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {!isBgColorInputValid && (
                    <p className="mt-2 text-[11px] text-red-600 dark:text-red-400 sm:text-xs">
                      {t.qrStudio.fields.invalidHex}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t.qrStudio.fields.size}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300 sm:px-3">
                      {size}px
                    </span>
                  </div>

                  <input
                    type="range"
                    min={240}
                    max={1000}
                    step={20}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-slate-900 dark:accent-white"
                  />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t.qrStudio.fields.margin}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300 sm:px-3">
                      {margin}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full accent-slate-900 dark:accent-white"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.quality.title}
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {localizedQualityOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setQuality(item.value)}
                      className={cn(
                        "rounded-2xl border p-4 text-center transition",
                        quality === item.value
                          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      )}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div
                        className={cn(
                          "mt-1 text-xs leading-6",
                          quality === item.value
                            ? "text-slate-200 dark:text-slate-700"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl bg-white px-4 py-3 text-center text-xs leading-6 text-slate-600 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-300">
                  {t.qrStudio.quality.outputPrefix}{" "}
                  <strong className="text-slate-900 dark:text-white">{outputWidth}px</strong>.{" "}
                  {t.qrStudio.quality.outputSuffix}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.errorCorrection.title}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["L", "M", "Q", "H"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setErrorLevel(level)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                        errorLevel === level
                          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">
                  {t.qrStudio.errorCorrection.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={copyUrl}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {t.qrStudio.actions.copyLink}
                </button>

                <button
                  onClick={clearForm}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {t.qrStudio.actions.clearContent}
                </button>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </div>
              )}
            </div>
          </section>

          <section className="order-1 flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:rounded-3xl sm:p-6 xl:order-none">
            <div className="mb-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">
                  {t.qrStudio.preview.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t.qrStudio.preview.subtitle}
                </p>
              </div>

              <div className="flex justify-center sm:block">
                <div
                  className={cn(
                    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    autoStatusClass
                  )}
                >
                  {autoStatusText}
                </div>
              </div>
            </div>

            <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/50 sm:min-h-[340px] sm:p-5 xl:min-h-0">
              <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-white p-4 transition-colors duration-300 dark:bg-slate-900 sm:p-6">
                {qrPng ? (
                  <img
                    src={qrPng}
                    alt="QR Preview"
                    className="block max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                      {t.qrStudio.preview.emptyBadge}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
                      {t.qrStudio.preview.emptyTitle}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {t.qrStudio.preview.emptyDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <button
                onClick={downloadPng}
                disabled={!qrPng}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {t.qrStudio.preview.downloadPng}
              </button>

              <button
                onClick={downloadSvg}
                disabled={!qrSvg}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.qrStudio.preview.downloadSvg}
              </button>

              <button
                onClick={printQr}
                disabled={!qrPng}
                className="col-span-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:col-span-1"
              >
                {t.qrStudio.preview.printQr}
              </button>
            </div>
          </section>

          <section className="order-3 flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:min-h-[320px] sm:rounded-3xl sm:p-6 xl:order-none xl:min-h-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t.qrStudio.recent.title}
              </h3>
              <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {t.qrStudio.recent.limit}
              </span>
            </div>

            {recentUrls.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.qrStudio.recent.empty}
                </p>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="space-y-2">
                  {recentUrls.map((item) => (
                    <div
                      key={item}
                      className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:flex-row sm:items-center"
                    >
                      <button
                        type="button"
                        onClick={() => setUrl(item)}
                        className="min-w-0 flex-1 rounded-xl bg-white px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <span className="block truncate">{item}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeRecent(item)}
                        className="shrink-0 rounded-xl px-3 py-2 text-left text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 sm:text-center"
                      >
                        {t.qrStudio.recent.remove}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}