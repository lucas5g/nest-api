import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheResetMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const httpMethod = req.method;

    if (
      httpMethod === 'POST' ||
      httpMethod === 'DELETE' ||
      httpMethod === 'PATCH'
    ) {
      this.cacheManager.reset();
    }

    next();
  }
}
