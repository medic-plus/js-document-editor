import { de_DE } from "./de_DE";
import { en_US } from "./en_US";
import { es_ES } from "./es_ES";
import { fr_FR } from "./fr_FR";
import { it_IT } from "./it_IT";
import { zh_CN } from "./zh_CN";

export const locales: Map<string, Locale> = new Map<string, Locale>([
  ["de_DE", de_DE],
  ["es_ES", es_ES],
  ["en_US", en_US],
  ["fr_FR", fr_FR],
  ["it_IT", it_IT],
  ["zh_CN", zh_CN],
]);
