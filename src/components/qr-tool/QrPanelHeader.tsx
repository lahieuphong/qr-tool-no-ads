"use client";

import { cn } from "@/lib/qr-tool";

type Props = {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeClassName: string;
};

export default function QrPanelHeader({
  title,
  subtitle,
  badgeText,
  badgeClassName,
}: Props) {
  return (
    /* PC + Mobile: panel header dùng chung */
    <div className="mb-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
      {/* Mobile: xếp dọc, căn giữa */}
      {/* PC: từ sm trở lên đổi sang hàng ngang và căn trái */}
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      {/* PC + Mobile: badge trạng thái */}
      <div className="flex justify-center sm:block">
        <div
          className={cn(
            "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
            badgeClassName
          )}
        >
          {badgeText}
        </div>
      </div>
    </div>
  );
}