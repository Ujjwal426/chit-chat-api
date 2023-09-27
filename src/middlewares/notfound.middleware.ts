/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { logger } from '@/utils/logger';

const NotFoundMiddleware = (req: Request, res: Response) => {
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${404}, Message: Route not found`);
  res.status(404).json({ error: 'Route Not Found' });
};

export default NotFoundMiddleware;
