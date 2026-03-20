"use client";

import { useQrStudio } from "@/hooks/useQrStudio";
import { QUALITY_OPTIONS, cn, isHexColor } from "@/lib/qr-tool";

export default function QrStudio() {
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
    qualityOption,
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
    generatedUrl,
    generatedAt,
    message,
    error,
    hydrated,
    normalizedPreview,
    hasUrl,
    isUrlReady,
    autoStatus,
    downloadPng,
    downloadSvg,
    copyUrl,
    printQr,
    clearForm,
    removeRecent,
  } = useQrStudio();

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 xl:px-8">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-6 sm:rounded-3xl sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex max-w-full items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:text-xs">
                QR Studio • Không quảng cáo
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl xl:text-5xl">
                Tạo mã QR chuyên nghiệp cho website của bạn
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Hệ thống sẽ tự động tạo mã QR ngay khi đường dẫn hợp lệ, không cần
                bấm nút tạo thủ công.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:w-auto xl:min-w-[520px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs text-slate-500">Chế độ</div>
                <div className="mt-1 text-sm font-semibold">Tự động tạo QR</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs text-slate-500">Định dạng</div>
                <div className="mt-1 text-sm font-semibold">PNG / SVG</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs text-slate-500">Chất lượng</div>
                <div className="mt-1 text-sm font-semibold">{qualityOption.label}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs text-slate-500">Trạng thái</div>
                <div className="mt-1 text-sm font-semibold">Không quảng cáo</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Cấu hình mã QR
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Chỉ cần nhập đường dẫn, QR sẽ tự động sinh khi hợp lệ.
                </p>
              </div>

              <div
                className={cn(
                  "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  autoStatus.className
                )}
              >
                {hydrated ? autoStatus.text : "Đang tải"}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Đường dẫn website
                </label>

                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Ví dụ: baotangmythuat.hongvan.online/chi-tiet-tac-pham/2?autoFullscreen"
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-base"
                />

                <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div className="text-sm text-slate-500">
                    {!hasUrl
                      ? "Bạn có thể dán link bất kỳ, hệ thống sẽ tự thêm https:// nếu thiếu."
                      : isUrlReady
                      ? "Đường dẫn hợp lệ. QR sẽ tự động cập nhật."
                      : "Đường dẫn chưa hợp lệ. QR sẽ chưa được tạo."}
                  </div>

                  {normalizedPreview && (
                    <div className="max-w-full rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      <div className="max-w-full truncate">{normalizedPreview}</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tên file tải về
                </label>

                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Ví dụ: qr-tac-pham-02"
                  className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">
                      Kích thước
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
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
                    className="w-full accent-slate-900"
                  />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">
                      Lề QR
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
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
                    className="w-full accent-slate-900"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 text-sm font-semibold text-slate-700">
                  Chất lượng mã QR
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {QUALITY_OPTIONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setQuality(item.value)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition",
                        quality === item.value
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div
                        className={cn(
                          "mt-1 text-xs leading-6",
                          quality === item.value ? "text-slate-200" : "text-slate-500"
                        )}
                      >
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl bg-white px-4 py-3 text-xs leading-6 text-slate-600">
                  PNG hiện tại sẽ được xuất ở khoảng <strong>{outputWidth}px</strong>.
                  SVG luôn sắc nét do là định dạng vector.
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 text-sm font-semibold text-slate-700">
                  Mức chống lỗi
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
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  QR sẽ tự cập nhật lại mỗi khi bạn đổi mức chống lỗi.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Màu QR
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => {
                        setFgColor(e.target.value);
                        setFgColorInput(e.target.value);
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white sm:w-16"
                    />

                    <input
                      type="text"
                      value={fgColorInput}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        setFgColorInput(nextValue);

                        if (isHexColor(nextValue)) {
                          setFgColor(nextValue);
                        }
                      }}
                      className={cn(
                        "w-full min-w-0 rounded-2xl border bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100",
                        isFgColorInputValid
                          ? "border-slate-200 text-slate-900"
                          : "border-red-200 text-red-600"
                      )}
                    />
                  </div>

                  {!isFgColorInputValid && (
                    <p className="mt-2 text-xs text-red-600">
                      Mã màu chưa hợp lệ. Hệ thống đang giữ màu QR hợp lệ trước đó.
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Màu nền
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => {
                        setBgColor(e.target.value);
                        setBgColorInput(e.target.value);
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white sm:w-16"
                    />

                    <input
                      type="text"
                      value={bgColorInput}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        setBgColorInput(nextValue);

                        if (isHexColor(nextValue)) {
                          setBgColor(nextValue);
                        }
                      }}
                      className={cn(
                        "w-full min-w-0 rounded-2xl border bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100",
                        isBgColorInputValid
                          ? "border-slate-200 text-slate-900"
                          : "border-red-200 text-red-600"
                      )}
                    />
                  </div>

                  {!isBgColorInputValid && (
                    <p className="mt-2 text-xs text-red-600">
                      Mã màu chưa hợp lệ. Hệ thống đang giữ màu nền hợp lệ trước đó.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={copyUrl}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Sao chép link
                </button>

                <button
                  onClick={clearForm}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Xóa nội dung
                </button>
              </div>

              {(message || error) && (
                <div
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm",
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700"
                  )}
                >
                  {error || message}
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-700">
                    Lịch sử link gần đây
                  </h3>
                  <span className="shrink-0 text-xs text-slate-400">
                    Tối đa 6 link
                  </span>
                </div>

                {recentUrls.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    Chưa có lịch sử. Khi QR được tạo thành công, link sẽ xuất hiện ở đây.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {recentUrls.map((item) => (
                      <div
                        key={item}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 sm:flex-row sm:items-center"
                      >
                        <button
                          type="button"
                          onClick={() => setUrl(item)}
                          className="min-w-0 flex-1 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                        >
                          <span className="block truncate">{item}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeRecent(item)}
                          className="rounded-xl px-3 py-2 text-left text-xs font-semibold text-slate-500 transition hover:bg-slate-100 sm:text-center"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                    Xem trước mã QR
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Hệ thống tự động cập nhật khi dữ liệu hợp lệ.
                  </p>
                </div>

                <div
                  className={cn(
                    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    autoStatus.className
                  )}
                >
                  {autoStatus.text}
                </div>
              </div>

              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-4 sm:p-5">
                {qrPng ? (
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-[420px] rounded-[28px] bg-white p-3 shadow-sm sm:p-4">
                      <img
                        src={qrPng}
                        alt="QR Preview"
                        className="mx-auto h-auto w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] bg-white px-4 text-center sm:min-h-[320px] sm:px-6">
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Preview
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-800 sm:text-xl">
                      Chưa có mã QR
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
                      Hãy nhập một đường dẫn hợp lệ ở bên trái. Ngay khi hợp lệ, mã QR sẽ tự động xuất hiện tại đây.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  onClick={downloadPng}
                  disabled={!qrPng}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Tải PNG
                </button>

                <button
                  onClick={downloadSvg}
                  disabled={!qrSvg}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Tải SVG
                </button>

                <button
                  onClick={printQr}
                  disabled={!qrPng}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  In mã QR
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
              <h3 className="text-lg font-bold text-slate-950">
                Thông tin đầu ra
              </h3>

              <div className="mt-4 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Link đang được mã hóa
                  </div>
                  <div className="mt-2 break-all text-sm leading-7 text-slate-800">
                    {generatedUrl || "Chưa có dữ liệu"}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Tên file
                    </div>
                    <div className="mt-2 break-all text-sm font-medium text-slate-800">
                      {fileName.trim() || "qr-code"}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Thời gian tạo
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-800">
                      {generatedAt || "Chưa tạo"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Chất lượng hiện tại
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-800">
                      {qualityOption.label}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Kích thước PNG xuất ra
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-800">
                      {outputWidth}px
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
                  QR này không chèn quảng cáo vì nó chứa trực tiếp link bạn nhập vào.
                  Nếu trang đích của bạn không có quảng cáo thì khi người dùng quét
                  cũng sẽ không thấy quảng cáo trung gian.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}