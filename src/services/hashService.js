import { createHash } from 'crypto';

export function generateHash(text, algorithm) {
  return createHash(algorithm).update(text).digest('hex');
}
