export function countWords(str) {
  if (!str || !str.length) return 0;
  return str.split(' ').length;
}
