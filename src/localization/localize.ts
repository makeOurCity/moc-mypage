import { ja } from './ja'

type JaKeys = keyof typeof ja;

export const localize = (key: string) => {
  key = key.replace(/ /g, '').toLowerCase();
  return ja[key as JaKeys] || key;
}
