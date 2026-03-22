export type ErrorLevel = "L" | "M" | "Q" | "H";
export type ExportQuality = "standard" | "high" | "print";

export type PersistedState = {
  url: string;
  fileName: string;
  size: number;
  margin: number;
  errorLevel: ErrorLevel;
  quality: ExportQuality;
  fgColor: string;
  bgColor: string;
  recentUrls: string[];
};

export type QualityOption = {
  value: ExportQuality;
  label: string;
  description: string;
  multiplier: number;
};

export const STORAGE_KEY = "qr-studio-state";
export const AUTO_GENERATE_DELAY = 350;

export const DEFAULT_FILE_NAME = "qr-code";
export const MAX_OUTPUT_WIDTH = 3000;
export const MAX_RECENT_URLS = 6;
export const DEFAULT_QUALITY: ExportQuality = "high";

export const DEFAULT_STATE: PersistedState = {
  url: "",
  fileName: "",
  size: 420,
  margin: 2,
  errorLevel: "H",
  quality: DEFAULT_QUALITY,
  fgColor: "#111827",
  bgColor: "#FFFFFF",
  recentUrls: [],
};

export const QUALITY_OPTIONS: ReadonlyArray<QualityOption> = [
  {
    value: "standard",
    label: "Chuẩn",
    description: "Phù hợp xem trên màn hình",
    multiplier: 1,
  },
  {
    value: "high",
    label: "Cao",
    description: "PNG nét hơn để chia sẻ",
    multiplier: 2,
  },
  {
    value: "print",
    label: "In ấn",
    description: "Xuất PNG lớn hơn để in",
    multiplier: 3,
  },
];

export function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isHexColor(value: string) {
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value.trim());
}

export function createSafeFileName(value: string) {
  try {
    const url = new URL(value);

    const host = url.hostname.replace(/\./g, "-");

    const path = url.pathname
      .replace(/^\/+|\/+$/g, "")
      .replace(/[^\w\-./]/g, "")
      .replace(/[/.]+/g, "-");

    const query = url.search
      .replace(/^\?/, "")
      .replace(/[^\w\-=&]/g, "")
      .replace(/[=&]+/g, "-");

    const raw = [host, path, query].filter(Boolean).join("-");

    return raw.slice(0, 80) || DEFAULT_FILE_NAME;
  } catch {
    return DEFAULT_FILE_NAME;
  }
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getQualityOption(value: ExportQuality) {
  const matched = QUALITY_OPTIONS.find((item) => item.value === value);
  if (matched) return matched;

  const fallback = QUALITY_OPTIONS.find(
    (item) => item.value === DEFAULT_QUALITY
  );
  if (fallback) return fallback;

  return QUALITY_OPTIONS[0];
}

export function getOutputWidth(size: number, quality: ExportQuality) {
  const multiplier = getQualityOption(quality).multiplier;
  return Math.min(size * multiplier, MAX_OUTPUT_WIDTH);
}