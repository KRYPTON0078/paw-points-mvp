import translations from './translations.json';
export type Locale = 'zh-Hans' | 'zh-Hant' | 'en' | 'pt';
export const languages: {code: Locale; label: string}[] = [
  {code:'zh-Hans', label:'简体中文'}, {code:'zh-Hant', label:'繁體中文'},
  {code:'en', label:'English'}, {code:'pt', label:'Português'},
];
export function translate(key:string, locale:Locale):string {
  const entry = (translations as Record<string,string[]>)[key];
  return locale==='en' ? key : entry?.[locale==='zh-Hans'?0:locale==='zh-Hant'?1:2] ?? key;
}
