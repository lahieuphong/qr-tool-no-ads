const REPO_NAME = "qr-tool-no-ads";
const REPOSITORY_OWNER = "lahieuphong";
const AUTHOR_NAME = "lahieuphong";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const BASE_PATH = IS_PRODUCTION ? `/${REPO_NAME}` : "";

function normalizePublicPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function withBasePath(path: string) {
  return `${BASE_PATH}${normalizePublicPath(path)}`;
}

export const APP_CONFIG = {
  repoName: REPO_NAME,
  repositoryOwner: REPOSITORY_OWNER,
  authorName: AUTHOR_NAME,
  isProduction: IS_PRODUCTION,
  basePath: BASE_PATH,
} as const;

export const APP_SECTION_IDS = {
  top: "top",
  qrStudio: "qr-studio",
} as const;

export const APP_LINKS = {
  githubProfile: `https://github.com/${REPOSITORY_OWNER}`,
  githubRepository: `https://github.com/${REPOSITORY_OWNER}/${REPO_NAME}`,
  githubPages: `https://${REPOSITORY_OWNER}.github.io/${REPO_NAME}/`,
  qrStudioAnchor: `#${APP_SECTION_IDS.qrStudio}`,
} as const;

export const APP_URLS = {
  localhost: "http://localhost:3000",
  defaultQrPlaceholder: `https://${REPOSITORY_OWNER}.github.io/${REPO_NAME}/`,
} as const;

export const APP_ASSETS = {
  brandLogo: withBasePath("/logo/qr-tool.png"),
  githubLogo: withBasePath("/logo/github.png"),
  themeLightIcon: withBasePath("/icon/theme-light.png"),
  themeDarkIcon: withBasePath("/icon/theme-dark.png"),
  flagVietnam: withBasePath("/flags/vn.png"),
  flagEnglish: withBasePath("/flags/us.png"),
} as const;

export const APP_AUTHOR = AUTHOR_NAME;