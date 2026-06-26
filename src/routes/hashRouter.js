import { Router } from 'express';
import { getHash } from '../controllers/hashController.js';

export const hashRouter = Router();

hashRouter.post('/hash', getHash);
