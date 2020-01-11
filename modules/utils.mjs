export function deepCopy(obj) {
  // TODO: a way to deep copy objects without data loss
  return JSON.parse(JSON.stringify(obj));
}
