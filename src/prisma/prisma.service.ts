import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  /**
   * PrismaService function for filtering the returned values from a query
   * @param  {Object} object The object you want to be returned
   * @param  {Array}  keys The keys you want to exclude from the returned object
   * @return {[type]}      The object without the keys mentioned
   */
  public exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
    for (const key of keys) {
      delete object[key];
    }
    return object;
  }

  /**
   * PrismaService function for filtering the returned values from a query
   * @param  {Object} object The object you want to be returned
   * @param  {Array}  keys The keys you want to include in the returned object
   * @return {[type]}      The object only with the keys mentioned
   */
  public includeOnly<T, Key extends keyof T>(
    object: T,
    keys: Key[],
  ): Omit<T, Key> {
    for (const key of keys) {
      if (!keys.includes(key)) {
        delete object[key];
      }
    }
    return object;
  }

  public cleanAll() {
    this.$transaction([this.user.deleteMany()]);
  }
}
