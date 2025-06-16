// Generate a random number between 1-9999, or whatever max-value you specify.
export const randomNumber = (max = 9999) => Math.floor(Math.random() * max);

// This function was borrowed from:
// jlevy / simple-hash.js
// https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
// This is an insecure 32-bit algorithm that will always be 7 chars long.
export function hash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  // Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
  return (hash >>> 0).toString(36).padStart(7, '0');
}

// Will generate a random hash with a length of 35 chars. using the above
// insecure 32-bit algorithm.
export const randomHash = () =>
  [1, 2, 3, 4, 5].reduce((prev) => prev + hash(Math.random().toString()), '');

// This function was borrowed from:
// (commented by user: tiagofrancafernandes)
// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0?permalink_comment_id=4466912#gistcomment-4466912
// Will generate a random Uuid v4 string.
export const randomUuid = () =>
  String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === 'x' ? random : (random & 0x3) | 0x8;

      return value.toString(16);
    }
  );

export function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') return source;

  const clone: unknown = Array.isArray(source) ? [] : {};

  for (const key in source)
    if (Object.prototype.hasOwnProperty.call(source, key))
      (clone as T)[key] = deepClone(source[key]);

  return clone as T;
}
