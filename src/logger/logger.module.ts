import { Global, Module } from '@nestjs/common';
import { Logger } from '@origranot/ts-logger';

export const LOGGER_INJECTION_KEY = 'TS_LOGGER';

const loggerFactory = {
  provide: LOGGER_INJECTION_KEY,
  useFactory: () => {
    return new Logger();
  },
};

@Global()
@Module({
  providers: [loggerFactory],
  exports: [loggerFactory],
})
export class AppLoggerModule {}
