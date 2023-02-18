import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { ServerError } from '../helpers/Errors.enums';
import { CustomHttpExceptionResponse } from '../helpers/Errors.interfaces';
import * as path from 'path';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: HttpStatus;
    let errorMessage: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = ServerError.InternalServerError;
    }
    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  private get pathToLogsDir() {
    return path.join(__dirname, '..', '..', 'logs');
  }
  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExceptionResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
      ${JSON.stringify(errorResponse)}\n\n
      ${exception instanceof HttpException ? exception.stack : error}\n\n`;
    return errorLog;
  };

  private async writeErrorLogToFile(errorLog: string): Promise<void> {
    const logDirectory = this.pathToLogsDir;
    if (!fs.existsSync(logDirectory)) {
      await fs.promises.mkdir(logDirectory);
    }
    const logFilePath = path.join(logDirectory, 'error.log');
    await fs.promises.appendFile(logFilePath, errorLog, 'utf8');
  }

  public writeApiRequestsLogToFile = () => {
    const logDirectory = this.pathToLogsDir;
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    fs.writeFileSync(path.join(logDirectory, 'error.log'), '');
    fs.writeFileSync(path.join(logDirectory, 'api.log'), '');
    const logStream = fs.createWriteStream(path.join(logDirectory, 'api.log'), {
      flags: 'a',
    });
    return morgan('tiny', { stream: logStream });
  };
}
