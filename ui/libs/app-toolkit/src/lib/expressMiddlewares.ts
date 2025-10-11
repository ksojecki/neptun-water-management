import { RequestHandler } from 'express';

/**
 * Middleware that allows cors requests from any origin.
 * @param req
 * @param res
 * @param next
 */
export const allowCorsRequests: RequestHandler =  (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
}
