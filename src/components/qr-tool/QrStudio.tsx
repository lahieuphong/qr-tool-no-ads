"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import QrColorField from "@/components/qr-tool/QrColorField";
import QrPanelHeader from "@/components/qr-tool/QrPanelHeader";
import QrRangeField from "@/components/qr-tool/QrRangeField";
import { useQrStudio } from "@/hooks/useQrStudio";
import { APP_URLS } from "@/lib/app-config";
import { QUALITY_OPTIONS, cn } from "@/lib/qr-tool";

const ERROR_LEVELS = ["L", "M", "Q", "H"] as const;

const STATUS_CLASS_MAP = {
  loading:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
  waiting:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
  invalid:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  generating:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  updated:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  ready:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
} as const;

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
    recentUrls,
    qrPng,
    qrSvg,
    error,
    normalizedPreview,
    hasUrl,
    isUrlReady,
    status,
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

  const autoStatusText = t.qrStudio.status[status];
  const autoStatusClass = STATUS_CLASS_MAP[status];

  return (
    /* PC + Mobile: page wrapper dùng chung */
    <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* PC + Mobile: container tổng */}
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 xl:px-8">
        {/* Mobile: padding nhỏ hơn */}
        {/* PC: tăng padding theo sm, md, xl */}

        {/* PC + Mobile: hero section */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:mb-6 sm:rounded-3xl sm:px-6 sm:py-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {/* Mobile: text-xl */}
            {/* PC: tăng lên sm:text-2xl, md:text-3xl */}
            <h1 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl md:text-3xl">
              {t.hero.title}
            </h1>

            {/* Mobile: text-sm */}
            {/* PC: sm:text-base */}
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              {t.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Mobile: 1 cột, preview lên trước */}
        {/* PC: từ xl chia 2 cột và 2 hàng */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] xl:items-stretch xl:gap-6">
          {/* PC + Mobile: config panel */}
          {/* Mobile: order-2 để preview hiển thị trước */}
          {/* PC: xl bỏ order và chiếm 2 hàng */}
          <section className="order-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:rounded-3xl sm:p-6 xl:order-0 xl:row-span-2">
            <QrPanelHeader
              title={t.qrStudio.config.title}
              subtitle={t.qrStudio.config.subtitle}
              badgeText={autoStatusText}
              badgeClassName={autoStatusClass}
            />

            <div className="space-y-5">
              {/* PC + Mobile: field URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.fields.websiteUrl}
                </label>

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={APP_URLS.defaultQrPlaceholder}
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800 sm:text-base"
                />

                <div className="mt-3">
                  {!hasUrl ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t.qrStudio.fields.autoAddHttps}
                    </div>
                  ) : normalizedPreview ? (
                    /* PC + Mobile: preview link */
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

              {/* PC + Mobile: field tên file */}
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

              {/* PC + Mobile: 2 cột cho màu, đổi thứ tự thành Màu nền - Màu QR */}
              {/* Mobile: vẫn giữ ngang 2 cột như PC */}
              {/* PC: tiếp tục 2 cột */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <QrColorField
                  label={t.qrStudio.fields.backgroundColor}
                  tag={t.qrStudio.fields.background}
                  mobileTag={t.qrStudio.fields.backgroundShort}
                  color={bgColor}
                  input={bgColorInput}
                  setColor={setBgColor}
                  setInput={setBgColorInput}
                  placeholder="FFFFFF"
                  invalidText={t.qrStudio.fields.invalidHex}
                />

                <QrColorField
                  label={t.qrStudio.fields.qrColor}
                  tag={t.qrStudio.fields.foreground}
                  mobileTag={t.qrStudio.fields.foregroundShort}
                  color={fgColor}
                  input={fgColorInput}
                  setColor={setFgColor}
                  setInput={setFgColorInput}
                  placeholder="111827"
                  invalidText={t.qrStudio.fields.invalidHex}
                />
              </div>

              {/* PC + Mobile: 2 cột cho size và margin */}
              {/* Mobile: vẫn giữ ngang 2 cột như PC */}
              {/* PC: tiếp tục 2 cột */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <QrRangeField
                  label={t.qrStudio.fields.size}
                  value={size}
                  min={240}
                  max={1000}
                  step={20}
                  suffix="px"
                  onChange={setSize}
                />

                <QrRangeField
                  label={t.qrStudio.fields.margin}
                  value={margin}
                  min={0}
                  max={8}
                  step={1}
                  onChange={setMargin}
                />
              </div>

              {/* PC + Mobile: quality section */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.quality.title}
                </div>

                {/* Mobile: 1 cột */}
                {/* PC: từ md chia 3 cột */}
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
                  <strong className="text-slate-900 dark:text-white">
                    {outputWidth}px
                  </strong>
                  . {t.qrStudio.quality.outputSuffix}
                </div>
              </div>

              {/* PC + Mobile: error correction section */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.qrStudio.errorCorrection.title}
                </div>

                {/* Mobile: 2 cột */}
                {/* PC: từ sm chia 4 cột */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ERROR_LEVELS.map((level) => (
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

              {/* Mobile: 1 cột */}
              {/* PC: từ sm chia 2 cột */}
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

              {/* PC + Mobile: error message */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </div>
              )}
            </div>
          </section>

          {/* PC + Mobile: preview panel */}
          {/* Mobile: order-1 để nằm trên */}
          {/* PC: xl bỏ order */}
          <section className="order-1 flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:rounded-3xl sm:p-6 xl:order-0">
            <QrPanelHeader
              title={t.qrStudio.preview.title}
              subtitle={t.qrStudio.preview.subtitle}
              badgeText={autoStatusText}
              badgeClassName={autoStatusClass}
            />

            {/* PC + Mobile: vùng xem trước QR */}
            <div className="flex min-h-75 flex-1 items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/50 sm:min-h-85 sm:p-5 xl:min-h-0">
              {/* Mobile: min-height 300px */}
              {/* PC: sm tăng 340px, xl trả về co giãn theo layout */}
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white p-4 transition-colors duration-300 dark:bg-slate-900 sm:p-6">
                {qrPng ? (
                  <img
                    src={qrPng}
                    alt="QR Preview"
                    className="block max-h-full max-w-full object-contain"
                  />
                ) : (
                  /* PC + Mobile: empty state */
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                      {t.qrStudio.preview.emptyBadge}
                    </div>

                    {/* Mobile: text-lg */}
                    {/* PC: sm:text-xl */}
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

            {/* Mobile: 2 cột, nút print chiếm 2 cột */}
            {/* PC: từ sm thành 3 cột, print trở lại 1 cột */}
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

          {/* PC + Mobile: recent panel */}
          <section className="order-3 flex min-h-70 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:min-h-80 sm:rounded-3xl sm:p-6 xl:order-0 xl:min-h-0">
            {/* Mobile: min-height 280px */}
            {/* PC: sm tăng lên 320px, xl co giãn theo grid */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t.qrStudio.recent.title}
              </h3>

              <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {t.qrStudio.recent.limit}
              </span>
            </div>

            {recentUrls.length === 0 ? (
              /* PC + Mobile: empty recent state */
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.qrStudio.recent.empty}
                </p>
              </div>
            ) : (
              /* PC + Mobile: danh sách recent có scroll */
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="space-y-2">
                  {recentUrls.map((item) => (
                    /* Mobile: item xếp dọc */
                    /* PC: từ sm đổi sang hàng ngang */
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

                      {/* Mobile: text-left */}
                      {/* PC: sm:text-center */}
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