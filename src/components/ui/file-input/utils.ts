export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
}

const unitMap = {
  b: 1,
  kb: 1024,
  mb: 1024 * 1024,
  gb: 1024 * 1024 * 1024,
  tb: 1024 * 1024 * 1024 * 1024
};

type Unit = keyof typeof unitMap;

export function calculateFileSize([size = 0, unit = 'b']: [
  number?,
  Unit?
] = []) {
  // eslint-disable-next-line no-prototype-builtins
  if (!unitMap.hasOwnProperty(unit)) {
    console.warn('Invalid unit specified, defaulting to bytes (b)');
    unit = 'b'; // Default to bytes
  }

  return size * unitMap[unit];
}
