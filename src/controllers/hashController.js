import { generateHash } from '../services/hashService.js';

export function getHash(req, res, next) {
  try {
    const { text, algorithm } = req.body;

    if (text === undefined || text === null) {
      const error = new Error('Field "text" is required.');
      error.status = 400;
      throw error;
    }

    if (typeof text !== 'string') {
      const error = new Error('Field "text" must be a string.');
      error.status = 400;
      throw error;
    }

    if (!algorithm) {
      const error = new Error('Field "algorithm" is required.');
      error.status = 400;
      throw error;
    }

    const allowedAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];
    if (!allowedAlgorithms.includes(algorithm)) {
      const error = new Error(`Field "algorithm" must be one of: ${allowedAlgorithms.join(', ')}.`);
      error.status = 400;
      throw error;
    }

    const hash = generateHash(text, algorithm);

    return res.status(200).json({
      text,
      algorithm,
      hash
    });
  } catch (error) {
    next(error);
  }
}
