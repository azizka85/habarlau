import enValues from '../../locales/en.json';
import ruValues from '../../locales/ru.json';
import kzValues from '../../locales/kz.json';

import i18n from 'roddeh-i18n';

export const locales = {
  en: i18n.create(enValues),
  ru: i18n.create(ruValues),
  kz: i18n.create(kzValues)
};

export type Langs = 'en' | 'ru' | 'kz';
