"use client";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  suffix?: string;
};

export default function QrRangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = "",
}: Props) {
  return (
    /* PC + Mobile: card range dùng chung */
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4">
      {/* Mobile: padding nhỏ */}
      {/* PC: tăng padding từ sm */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </span>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300 sm:px-3">
          {value}
          {suffix}
        </span>
      </div>

      {/* PC + Mobile: thanh range dùng chung */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-slate-900 dark:accent-white"
      />
    </div>
  );
}