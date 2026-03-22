"use client";

import { cn, isHexColor } from "@/lib/qr-tool";

type Props = {
  label: string;
  tag: string;
  mobileTag?: string;
  color: string;
  input: string;
  setColor: (value: string) => void;
  setInput: (value: string) => void;
  placeholder: string;
  invalidText: string;
};

export default function QrColorField({
  label,
  tag,
  mobileTag,
  color,
  input,
  setColor,
  setInput,
  placeholder,
  invalidText,
}: Props) {
  const isValid = isHexColor(input);
  const resolvedMobileTag = mobileTag ?? tag;

  return (
    /* PC + Mobile: card chọn màu dùng chung */
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4 md:p-5">
      {/* Mobile: padding gọn */}
      {/* PC: tăng padding ở sm, md */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>

        {/* Mobile: ẩn hoàn toàn tag BG / FG */}
        {/* PC: giữ nguyên tag đầy đủ */}
        <span
          className="hidden min-w-23 items-center justify-center rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-300 sm:inline-flex sm:px-3 sm:text-xs"
          title={tag}
          aria-label={tag}
          data-mobile-tag={resolvedMobileTag}
        >
          {tag}
        </span>
      </div>

      {/* PC + Mobile: preview màu + input HEX */}
      <div className="flex items-center gap-3">
        {/* Mobile: ô chọn màu nhỏ hơn */}
        {/* PC: ô chọn màu lớn hơn từ sm */}
        <label className="group relative block h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 sm:h-12 sm:w-12">
          <span
            className="block h-full w-full rounded-xl border border-slate-200 dark:border-slate-700"
            style={{ backgroundColor: color }}
          />

          <input
            type="color"
            value={color}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              setColor(value);
              setInput(value);
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>

        <div className="min-w-0 flex-1">
          {/* Mobile: chiều cao input thấp hơn */}
          {/* PC: tăng chiều cao và padding ở sm */}
          <div
            className={cn(
              "flex h-11 items-center rounded-2xl border bg-white px-3 shadow-sm transition dark:bg-slate-900 sm:h-12 sm:px-4",
              isValid
                ? "border-slate-200 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 dark:border-slate-700 dark:focus-within:border-slate-500 dark:focus-within:ring-slate-800"
                : "border-red-200 focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 dark:border-red-800 dark:focus-within:border-red-700 dark:focus-within:ring-red-950/40"
            )}
          >
            <span className="mr-2 text-xs font-semibold text-slate-400 dark:text-slate-500 sm:text-sm">
              #
            </span>

            <input
              type="text"
              value={input.replace(/^#/, "")}
              onChange={(e) => {
                const raw = e.target.value
                  .toUpperCase()
                  .replace(/[^0-9A-F]/g, "");
                const nextValue = `#${raw}`;

                setInput(nextValue);

                if (isHexColor(nextValue)) {
                  setColor(nextValue);
                }
              }}
              maxLength={8}
              placeholder={placeholder}
              className={cn(
                "w-full min-w-0 bg-transparent text-sm font-semibold tracking-[0.04em] outline-none sm:text-base",
                isValid
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-red-600 dark:text-red-400"
              )}
            />
          </div>
        </div>
      </div>

      {/* PC + Mobile: hiển thị lỗi mã màu */}
      {!isValid && (
        <p className="mt-2 text-[11px] text-red-600 dark:text-red-400 sm:text-xs">
          {invalidText}
        </p>
      )}
    </div>
  );
}