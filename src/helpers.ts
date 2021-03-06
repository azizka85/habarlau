import { LANGUAGES } from "./globals";

export function getQueryParameters(
  query: {[key: string]: any}
) {
  const parameters: string[] = [];

  for(let key of Object.keys(query)) {
    parameters.push(`${key}=${query[key]}`);
  }

  return parameters.join('&');  
}

export function setQueryParameter(
  query: {[key: string]: any}, 
  parameter: string, 
  value: string
) {
  const data = {...query};

  data[parameter] = value;

  return getQueryParameters(data);
}

export function toggleQueryParameter(
  query: {[key: string]: any}, 
  parameter: string
) {
  const data = {...query};

  if(parameter in data) {
    delete data[parameter];

    return getQueryParameters(data);
  }

  return setQueryParameter(data, parameter, '1');
}

export function capitalize(input: string) {
  if(!input) {
    return input;
  }

  const chars = input.split('');

  return chars[0].toUpperCase() + chars.slice(1).join('').toLowerCase();
}

export function toCamel(input: string) {
  const parts = input.split('-');

  return parts.map(item => capitalize(item)).join('');
}

export const localeRoute = `(${Object.keys(LANGUAGES).join('|')})?`;

export function trimSlashes(path: string) {
  return path.replace(/\/$/, '').replace(/^\//, '');
}

export function changeLangPath(url: string, lang: string) {
  url = trimSlashes(url);

  const langRoute = new RegExp(`^(${Object.keys(LANGUAGES).join('|')})`);

  const index = url.search(langRoute);

  if(index >= 0) {
    return url.replace(langRoute, lang)
  }

  return `${lang}/${url}`;
}