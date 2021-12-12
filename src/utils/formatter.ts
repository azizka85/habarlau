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
