"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  AUTO_GENERATE_DELAY,
  DEFAULT_FILE_NAME,
  DEFAULT_QUALITY,
  DEFAULT_STATE,
  MAX_RECENT_URLS,
  STORAGE_KEY,
  createSafeFileName,
  getOutputWidth,
  isHexColor,
  isValidUrl,
  normalizeUrl,
  type ExportQuality,
  type PersistedState,
} from "@/lib/qr-tool";

type QrStudioStatus =
  | "loading"
  | "waiting"
  | "invalid"
  | "generating"
  | "updated"
  | "ready";

const QUALITY_VALUES: ExportQuality[] = ["standard", "high", "print"];
const ERROR_LEVEL_VALUES = ["L", "M", "Q", "H"] as const;

function isExportQuality(value: unknown): value is ExportQuality {
  return typeof value === "string" && QUALITY_VALUES.includes(value as ExportQuality);
}

function isErrorLevel(
  value: unknown
): value is PersistedState["errorLevel"] {
  return (
    typeof value === "string" &&
    ERROR_LEVEL_VALUES.includes(value as PersistedState["errorLevel"])
  );
}

function readPersistedState(): PersistedState {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return DEFAULT_STATE;
    }

    const parsed = JSON.parse(raw) as Partial<PersistedState>;

    return {
      url: typeof parsed.url === "string" ? parsed.url : DEFAULT_STATE.url,
      fileName:
        typeof parsed.fileName === "string"
          ? parsed.fileName
          : DEFAULT_STATE.fileName,
      size:
        typeof parsed.size === "number" ? parsed.size : DEFAULT_STATE.size,
      margin:
        typeof parsed.margin === "number"
          ? parsed.margin
          : DEFAULT_STATE.margin,
      errorLevel: isErrorLevel(parsed.errorLevel)
        ? parsed.errorLevel
        : DEFAULT_STATE.errorLevel,
      quality: isExportQuality(parsed.quality)
        ? parsed.quality
        : DEFAULT_QUALITY,
      fgColor:
        typeof parsed.fgColor === "string" && isHexColor(parsed.fgColor)
          ? parsed.fgColor.toUpperCase()
          : DEFAULT_STATE.fgColor,
      bgColor:
        typeof parsed.bgColor === "string" && isHexColor(parsed.bgColor)
          ? parsed.bgColor.toUpperCase()
          : DEFAULT_STATE.bgColor,
      recentUrls: Array.isArray(parsed.recentUrls)
        ? parsed.recentUrls
            .filter((item): item is string => typeof item === "string")
            .slice(0, MAX_RECENT_URLS)
        : DEFAULT_STATE.recentUrls,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function triggerDownload(href: string, fileName: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function useQrStudio() {
  const [url, setUrl] = useState(DEFAULT_STATE.url);
  const [fileName, setFileName] = useState(DEFAULT_STATE.fileName);
  const [size, setSize] = useState(DEFAULT_STATE.size);
  const [margin, setMargin] = useState(DEFAULT_STATE.margin);
  const [errorLevel, setErrorLevel] = useState(DEFAULT_STATE.errorLevel);
  const [quality, setQuality] = useState<ExportQuality>(DEFAULT_QUALITY);

  const [fgColor, setFgColor] = useState(DEFAULT_STATE.fgColor);
  const [bgColor, setBgColor] = useState(DEFAULT_STATE.bgColor);
  const [fgColorInput, setFgColorInput] = useState(DEFAULT_STATE.fgColor);
  const [bgColorInput, setBgColorInput] = useState(DEFAULT_STATE.bgColor);

  const [recentUrls, setRecentUrls] = useState<string[]>(
    DEFAULT_STATE.recentUrls
  );

  const [qrPng, setQrPng] = useState("");
  const [qrSvg, setQrSvg] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generationRef = useRef(0);

  const normalizedPreview = useMemo(() => normalizeUrl(url), [url]);
  const hasUrl = url.trim().length > 0;
  const isUrlReady =
    normalizedPreview.length > 0 && isValidUrl(normalizedPreview);
  const outputWidth = useMemo(
    () => getOutputWidth(size, quality),
    [size, quality]
  );

  const status = useMemo<QrStudioStatus>(() => {
    if (!hydrated) return "loading";
    if (!hasUrl) return "waiting";
    if (!isUrlReady) return "invalid";
    if (isGenerating) return "generating";
    if (generatedUrl) return "updated";
    return "ready";
  }, [generatedUrl, hasUrl, hydrated, isGenerating, isUrlReady]);

  useEffect(() => {
    const persisted = readPersistedState();

    setUrl(persisted.url);
    setFileName(persisted.fileName);
    setSize(persisted.size);
    setMargin(persisted.margin);
    setErrorLevel(persisted.errorLevel);
    setQuality(persisted.quality);
    setFgColor(persisted.fgColor);
    setBgColor(persisted.bgColor);
    setFgColorInput(persisted.fgColor);
    setBgColorInput(persisted.bgColor);
    setRecentUrls(persisted.recentUrls);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      const payload: PersistedState = {
        url,
        fileName,
        size,
        margin,
        errorLevel,
        quality,
        fgColor,
        bgColor,
        recentUrls,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    url,
    fileName,
    size,
    margin,
    errorLevel,
    quality,
    fgColor,
    bgColor,
    recentUrls,
    hydrated,
  ]);

  useEffect(() => {
    if (!hydrated) return;

    generationRef.current += 1;
    const requestId = generationRef.current;

    if (!normalizedPreview) {
      setQrPng("");
      setQrSvg("");
      setGeneratedUrl("");
      setError("");
      setIsGenerating(false);
      return;
    }

    if (!isUrlReady) {
      setQrPng("");
      setQrSvg("");
      setGeneratedUrl("");
      setError("Đường dẫn chưa hợp lệ.");
      setIsGenerating(false);
      return;
    }

    setError("");
    setIsGenerating(true);

    const timer = window.setTimeout(async () => {
      try {
        const options = {
          width: outputWidth,
          margin,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        } as const;

        const [png, svg] = await Promise.all([
          QRCode.toDataURL(normalizedPreview, options),
          QRCode.toString(normalizedPreview, {
            ...options,
            type: "svg",
          }),
        ]);

        if (generationRef.current !== requestId) return;

        setQrPng(png);
        setQrSvg(svg);
        setGeneratedUrl(normalizedPreview);
        setRecentUrls((prev) => {
          const merged = [
            normalizedPreview,
            ...prev.filter((item) => item !== normalizedPreview),
          ];
          return merged.slice(0, MAX_RECENT_URLS);
        });
        setError("");
      } catch {
        if (generationRef.current !== requestId) return;

        setQrPng("");
        setQrSvg("");
        setGeneratedUrl("");
        setError("Không thể tạo mã QR. Vui lòng kiểm tra lại dữ liệu.");
      } finally {
        if (generationRef.current === requestId) {
          setIsGenerating(false);
        }
      }
    }, AUTO_GENERATE_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    hydrated,
    normalizedPreview,
    isUrlReady,
    outputWidth,
    margin,
    errorLevel,
    fgColor,
    bgColor,
  ]);

  const downloadPng = () => {
    if (!qrPng) return;

    const name =
      (fileName.trim() || createSafeFileName(generatedUrl || normalizedPreview)) +
      ".png";

    triggerDownload(qrPng, name);
    setError("");
  };

  const downloadSvg = () => {
    if (!qrSvg) return;

    const name =
      (fileName.trim() || createSafeFileName(generatedUrl || normalizedPreview)) +
      ".svg";

    const blob = new Blob([qrSvg], {
      type: "image/svg+xml;charset=utf-8",
    });

    const blobUrl = URL.createObjectURL(blob);
    triggerDownload(blobUrl, name);

    window.setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);

    setError("");
  };

  const copyUrl = async () => {
    const value = generatedUrl || normalizedPreview;

    if (!value) {
      setError("Chưa có đường dẫn để sao chép.");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setError("");
    } catch {
      setError("Không thể sao chép đường dẫn.");
    }
  };

  const printQr = () => {
    if (!qrPng) return;

    const title = fileName.trim() || DEFAULT_FILE_NAME;
    const win = window.open("", "_blank", "width=900,height=700");

    if (!win) {
      setError("Không thể mở cửa sổ in.");
      return;
    }

    win.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
              text-align: center;
              color: #111827;
            }
            .wrap {
              max-width: 700px;
              margin: 0 auto;
            }
            img {
              width: min(320px, 100%);
              height: auto;
              object-fit: contain;
              margin: 24px auto;
              display: block;
            }
            .url {
              word-break: break-word;
              font-size: 16px;
              line-height: 1.6;
            }
            .title {
              font-size: 28px;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="title">${title}</div>
            <img src="${qrPng}" alt="QR Code" />
            <div class="url">${generatedUrl || normalizedPreview}</div>
          </div>
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  const clearForm = () => {
    generationRef.current += 1;
    setUrl("");
    setFileName("");
    setQrPng("");
    setQrSvg("");
    setGeneratedUrl("");
    setError("");
  };

  const removeRecent = (value: string) => {
    setRecentUrls((prev) => prev.filter((item) => item !== value));
  };

  return {
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
    hydrated,
    normalizedPreview,
    hasUrl,
    isUrlReady,
    isGenerating,
    generatedUrl,
    status,
    downloadPng,
    downloadSvg,
    copyUrl,
    printQr,
    clearForm,
    removeRecent,
  };
}