export const locales = ["en", "zh-hant", "zh-hans"] as const;
export type Locale = typeof locales[number];
export const labels: Record<Locale, string> = { en: "English", "zh-hant": "繁體中文", "zh-hans": "简体中文" };
export function localeFromPath(path: string): Locale {
 const first = path.split("/")[1];
 return first === "zh-hant" || first === "zh-hans" ? first : "en";
}
export function localeUrl(locale: Locale, path = "/"): string {
 const bare = path.replace(/^\/zh-han[ts](?=\/|$)/, "") || "/";
 return locale === "en" ? bare : `/${locale}${bare}`;
}
export function dateLocale(locale: Locale) { return locale === "en" ? "en-US" : locale === "zh-hant" ? "zh-HK" : "zh-CN"; }
const translations: Record<string, [string, string]> = {
 "Home": ["首頁", "首页"], "Posts": ["文章", "文章"], "All Posts": ["所有文章", "所有文章"],
 "Browse all blog posts": ["瀏覽所有網誌文章", "浏览所有博客文章"], "No posts yet.": ["暫時沒有文章。", "暂时没有文章。"],
 "No posts yet": ["暫時沒有文章", "暂时没有文章"], "Latest": ["最新文章", "最新文章"], "Latest posts": ["最新文章", "最新文章"],
 "View all": ["查看全部", "查看全部"], "Published": ["發佈日期", "发布日期"], "Reading time": ["閱讀時間", "阅读时间"],
 "min read": ["分鐘閱讀", "分钟阅读"], "min": ["分鐘", "分钟"], "Tags": ["標籤", "标签"],
 "On this page": ["文章目錄", "文章目录"], "Continue reading": ["繼續閱讀", "继续阅读"],
 "Navigate": ["導覽", "导航"], "Connect": ["聯繫", "联系"], "Search...": ["搜尋⋯", "搜索⋯"],
 "About": ["關於", "关于"], "Author": ["作者", "作者"], "Authors": ["作者", "作者"]
};
export function translate(locale: Locale, text: string): string {
 return locale === "en" ? text : translations[text]?.[locale === "zh-hant" ? 0 : 1] ?? text;
}
