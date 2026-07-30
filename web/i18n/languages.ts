/** UI locales that have a selectable bundle. The bundles may fall back to English per key. */
export const APP_LANGUAGES = [
  {
    code: "en",
    labelKey: "language.english",
    locale: "en-US",
    aliases: ["en", "en-us", "english"],
  },
  {
    code: "zh",
    labelKey: "language.chinese",
    locale: "zh-CN",
    aliases: ["zh", "zh-cn", "cn", "chinese"],
  },
  {
    code: "es",
    labelKey: "language.spanishSpain",
    locale: "es-ES",
    aliases: ["es", "es-es", "spanish", "español"],
  },
  {
    code: "fr",
    labelKey: "language.french",
    locale: "fr-FR",
    aliases: ["fr", "fr-fr", "french", "français"],
  },
  {
    code: "de",
    labelKey: "language.german",
    locale: "de-DE",
    aliases: ["de", "de-de", "german", "deutsch"],
  },
  {
    code: "uk",
    labelKey: "language.ukrainian",
    locale: "uk-UA",
    aliases: ["uk", "uk-ua", "ua", "ukrainian"],
  },
] as const;

export type AppLanguage = (typeof APP_LANGUAGES)[number]["code"];

export interface AppLanguageDefinition {
  code: AppLanguage;
  labelKey: string;
  locale: string;
  aliases: readonly string[];
}

export const APP_LANGUAGE_DEFINITIONS: readonly AppLanguageDefinition[] = APP_LANGUAGES;

export function isAppLanguage(value: unknown): value is AppLanguage {
  return typeof value === "string" &&
    APP_LANGUAGES.some(({ code }) => code === value);
}

export function normalizeLanguage(language: unknown): AppLanguage {
  const candidate = String(language ?? "")
    .trim()
    .toLowerCase()
    .replaceAll("_", "-");
  const base = candidate.split("-", 1)[0];
  return (
    APP_LANGUAGE_DEFINITIONS.find(({ aliases }) =>
      aliases.includes(candidate) || aliases.includes(base),
    )
      ?.code ?? "en"
  );
}

export function localeForLanguage(language: unknown): string {
  const normalized = normalizeLanguage(language);
  return (
    APP_LANGUAGE_DEFINITIONS.find(({ code }) => code === normalized)?.locale ??
    "en-US"
  );
}
