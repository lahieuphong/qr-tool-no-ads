"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  AUTO_GENERATE_DELAY,
  DEFAULT_STATE,
  ExportQuality,
  PersistedState,
  STORAGE_KEY,
  createSafeFileName,
  getOutputWidth,
  getQualityOption,
  isHexColor,
  isValidUrl,
  normalizeUrl,
} from "@/lib/qr-tool";

export function useQrStudio() {
  const [url, setUrl] = useState(DEFAULT_STATE.url);
  const [fileName, setFileName] = useState(DEFAULT_STATE.fileName);
  const [size, setSize] = useState(DEFAULT_STATE.size);
  const [margin, setMargin] = useState(DEFAULT_STATE.margin);
  const [errorLevel, setErrorLevel] = useState(DEFAULT_STATE.errorLevel);
  const [quality, setQuality] = useState<ExportQuality>(DEFAULT_STATE.quality);

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
  const [generatedAt, setGeneratedAt] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generationRef = useRef(0);

  const normalizedPreview = useMemo(() => normalizeUrl(url), [url]);
  const hasUrl = url.trim().length > 0;
  const isUrlReady =
    normalizedPreview.length > 0 && isValidUrl(normalizedPreview);
  const isFgColorInputValid = isHexColor(fgColorInput);
  const isBgColorInputValid = isHexColor(bgColorInput);

  const qualityOption = useMemo(() => getQualityOption(quality), [quality]);
  const outputWidth = useMemo(
    () => getOutputWidth(size, quality),
    [size, quality]
  );

  const autoStatus = useMemo(() => {
    if (!hasUrl) {
      return {
        text: "Chờ nhập link",
        className: "border-slate-200 bg-slate-50 text-slate-600",
      };
    }

    if (!isUrlReady) {
      return {
        text: "Link chưa hợp lệ",
        className: "border-amber-200 bg-amber-50 text-amber-700",
      };
    }

    if (isGenerating) {
      return {
        text: "Đang tự động tạo QR",
        className: "border-blue-200 bg-blue-50 text-blue-700",
      };
    }

    if (generatedUrl) {
      return {
        text: "Đã tự động cập nhật",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    }

    return {
      text: "Sẵn sàng",
      className: "border-slate-200 bg-slate-50 text-slate-600",
    };
  }, [generatedUrl, hasUrl, isGenerating, isUrlReady]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;

        const nextUrl = parsed.url ?? DEFAULT_STATE.url;
        const nextFileName = parsed.fileName ?? DEFAULT_STATE.fileName;
        const nextSize = parsed.size ?? DEFAULT_STATE.size;
        const nextMargin = parsed.margin ?? DEFAULT_STATE.margin;
        const nextErrorLevel = parsed.errorLevel ?? DEFAULT_STATE.errorLevel;
        const nextQuality = parsed.quality ?? DEFAULT_STATE.quality;
        const nextFgColor = parsed.fgColor ?? DEFAULT_STATE.fgColor;
        const nextBgColor = parsed.bgColor ?? DEFAULT_STATE.bgColor;
        const nextRecentUrls = parsed.recentUrls ?? DEFAULT_STATE.recentUrls;

        setUrl(nextUrl);
        setFileName(nextFileName);
        setSize(nextSize);
        setMargin(nextMargin);
        setErrorLevel(nextErrorLevel);
        setQuality(nextQuality);
        setFgColor(nextFgColor);
        setBgColor(nextBgColor);
        setFgColorInput(nextFgColor);
        setBgColorInput(nextBgColor);
        setRecentUrls(nextRecentUrls);
      }
    } catch {
    } finally {
      setHydrated(true);
    }
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
    } catch {
    }
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

    const normalized = normalizeUrl(url);
    generationRef.current += 1;
    const requestId = generationRef.current;

    if (!normalized) {
      setQrPng("");
      setQrSvg("");
      setGeneratedUrl("");
      setGeneratedAt("");
      setError("");
      setMessage("");
      setIsGenerating(false);
      return;
    }

    if (!isValidUrl(normalized)) {
      setQrPng("");
      setQrSvg("");
      setGeneratedUrl("");
      setGeneratedAt("");
      setError("Đường dẫn chưa hợp lệ.");
      setMessage("");
      setIsGenerating(false);
      return;
    }

    setError("");
    setMessage("");
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
          QRCode.toDataURL(normalized, options),
          QRCode.toString(normalized, {
            ...options,
            type: "svg",
          }),
        ]);

        if (generationRef.current !== requestId) return;

        setQrPng(png);
        setQrSvg(svg);
        setGeneratedUrl(normalized);
        setGeneratedAt(new Date().toLocaleString("vi-VN"));
        setRecentUrls((prev) => {
          const merged = [normalized, ...prev.filter((item) => item !== normalized)];
          return merged.slice(0, 6);
        });
        setMessage("Mã QR đã được tự động cập nhật.");
        setError("");
      } catch {
        if (generationRef.current !== requestId) return;

        setQrPng("");
        setQrSvg("");
        setGeneratedUrl("");
        setGeneratedAt("");
        setError("Không thể tạo mã QR. Vui lòng kiểm tra lại dữ liệu.");
        setMessage("");
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
    url,
    size,
    margin,
    errorLevel,
    quality,
    fgColor,
    bgColor,
    hydrated,
    outputWidth,
  ]);

  const downloadPng = () => {
    if (!qrPng) return;

    const name =
      (fileName.trim() || createSafeFileName(generatedUrl || normalizedPreview)) +
      ".png";

    const link = document.createElement("a");
    link.href = qrPng;
    link.download = name;
    link.click();

    setMessage("Đã tải file PNG.");
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

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    link.click();

    URL.revokeObjectURL(blobUrl);

    setMessage("Đã tải file SVG.");
    setError("");
  };

  const copyUrl = async () => {
    const value = generatedUrl || normalizedPreview;

    if (!value) {
      setError("Chưa có đường dẫn để sao chép.");
      setMessage("");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setMessage("Đã sao chép đường dẫn.");
      setError("");
    } catch {
      setError("Không thể sao chép đường dẫn.");
      setMessage("");
    }
  };

  const printQr = () => {
    if (!qrPng) return;

    const title = fileName.trim() || "QR Code";
    const win = window.open("", "_blank", "width=900,height=700");

    if (!win) {
      setError("Không thể mở cửa sổ in.");
      setMessage("");
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
    setGeneratedAt("");
    setMessage("");
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
    isGenerating,
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
  };
}