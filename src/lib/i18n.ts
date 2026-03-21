export type Language = "vi" | "en";

export const LANGUAGE_STORAGE_KEY = "qr-tool-language";
export const DEFAULT_LANGUAGE: Language = "vi";

export const dictionaries = {
  vi: {
    header: {
      brandTitle: "QR Tool No Ads",
      brandSub: "Tạo mã QR nhanh, sạch, hiện đại",
      github: "GitHub",
      vi: "VI",
      en: "EN",
    },

    hero: {
      title: "Tạo mã QR chuyên nghiệp",
      subtitle:
        "Nhập đường dẫn, hệ thống sẽ tự động tạo mã QR để tải xuống hoặc in ấn.",
    },

    qrStudio: {
      config: {
        title: "Cấu hình mã QR",
        subtitle: "Chỉ cần nhập đường dẫn, QR sẽ tự động sinh khi hợp lệ.",
      },

      status: {
        loading: "Đang tải",
        waiting: "Chờ nhập link",
        invalid: "Link chưa hợp lệ",
        generating: "Đang tự động tạo QR",
        updated: "Đã tự động cập nhật",
        ready: "Sẵn sàng",
      },

      fields: {
        websiteUrl: "Đường dẫn website",
        autoAddHttps: "Tự thêm https:// nếu thiếu",
        validLinkAutoUpdate: "Link hợp lệ • QR tự cập nhật",
        invalidLink: "Link chưa hợp lệ",
        downloadFileName: "Tên file tải về",
        downloadFilePlaceholder: "Ví dụ: qr-tac-pham-02",
        qrColor: "Màu QR",
        foreground: "Foreground",
        backgroundColor: "Màu nền",
        background: "Background",
        invalidHex: "Mã HEX chưa hợp lệ.",
        size: "Kích thước",
        margin: "Lề QR",
      },

      quality: {
        title: "Chất lượng mã QR",
        outputPrefix: "PNG hiện tại sẽ được xuất ở khoảng",
        outputSuffix: "SVG luôn sắc nét do là định dạng vector.",
      },

      qualityOptions: {
        standard: {
          label: "Chuẩn",
          description: "Phù hợp xem trên màn hình",
        },
        high: {
          label: "Cao",
          description: "PNG nét hơn để chia sẻ",
        },
        print: {
          label: "In ấn",
          description: "Xuất PNG lớn hơn để in",
        },
      },

      errorCorrection: {
        title: "Mức chống lỗi",
        description: "QR sẽ tự cập nhật lại mỗi khi bạn đổi mức chống lỗi.",
      },

      actions: {
        copyLink: "Sao chép link",
        clearContent: "Xóa nội dung",
      },

      preview: {
        title: "Xem trước mã QR",
        subtitle: "Hệ thống tự động cập nhật khi dữ liệu hợp lệ.",
        emptyBadge: "Preview",
        emptyTitle: "Chưa có mã QR",
        emptyDescription:
          "Hãy nhập một đường dẫn hợp lệ ở bên trái. Ngay khi hợp lệ, mã QR sẽ tự động xuất hiện tại đây.",
        downloadPng: "Tải PNG",
        downloadSvg: "Tải SVG",
        printQr: "In mã QR",
      },

      recent: {
        title: "Lịch sử link gần đây",
        limit: "Tối đa 6 link",
        empty:
          "Chưa có lịch sử. Khi QR được tạo thành công, link sẽ xuất hiện ở đây.",
        remove: "Xóa",
      },
    },

    footer: {
      copyright: "© 2026 QR Tool No Ads.",
      madeBy: "Được tạo bởi",
    },
  },

  en: {
    header: {
      brandTitle: "QR Tool No Ads",
      brandSub: "Fast, clean, modern QR code generator",
      github: "GitHub",
      vi: "VI",
      en: "EN",
    },

    hero: {
      title: "Create professional QR codes",
      subtitle:
        "Enter a URL and the system will automatically generate a QR code for download or printing.",
    },

    qrStudio: {
      config: {
        title: "QR code settings",
        subtitle:
          "Just enter a URL and the QR code will be generated automatically when valid.",
      },

      status: {
        loading: "Loading",
        waiting: "Waiting for URL",
        invalid: "Invalid link",
        generating: "Generating QR automatically",
        updated: "Auto updated",
        ready: "Ready",
      },

      fields: {
        websiteUrl: "Website URL",
        autoAddHttps: "Automatically adds https:// if missing",
        validLinkAutoUpdate: "Valid link • QR auto updated",
        invalidLink: "Invalid link",
        downloadFileName: "Download file name",
        downloadFilePlaceholder: "Example: qr-item-02",
        qrColor: "QR color",
        foreground: "Foreground",
        backgroundColor: "Background color",
        background: "Background",
        invalidHex: "Invalid HEX code.",
        size: "Size",
        margin: "QR margin",
      },

      quality: {
        title: "QR code quality",
        outputPrefix: "Current PNG export size is about",
        outputSuffix:
          "SVG always stays sharp because it is a vector format.",
      },

      qualityOptions: {
        standard: {
          label: "Standard",
          description: "Suitable for screen viewing",
        },
        high: {
          label: "High",
          description: "Sharper PNG for sharing",
        },
        print: {
          label: "Print",
          description: "Larger PNG export for printing",
        },
      },

      errorCorrection: {
        title: "Error correction level",
        description:
          "The QR code updates automatically whenever you change the error correction level.",
      },

      actions: {
        copyLink: "Copy link",
        clearContent: "Clear content",
      },

      preview: {
        title: "QR code preview",
        subtitle: "The system updates automatically when the data is valid.",
        emptyBadge: "Preview",
        emptyTitle: "No QR code yet",
        emptyDescription:
          "Enter a valid URL on the left. Once valid, the QR code will appear here automatically.",
        downloadPng: "Download PNG",
        downloadSvg: "Download SVG",
        printQr: "Print QR",
      },

      recent: {
        title: "Recent links",
        limit: "Up to 6 links",
        empty:
          "No history yet. When a QR code is created successfully, the link will appear here.",
        remove: "Remove",
      },
    },

    footer: {
      copyright: "© 2026 QR Tool No Ads.",
      madeBy: "Made by",
    },
  },
} as const;