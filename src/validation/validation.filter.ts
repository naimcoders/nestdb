import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(
  ZodError,
  HttpException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    let code: number;
    let errors: string;

    switch (true) {
      case exception instanceof HttpException:
        code = (exception as HttpException).getStatus();
        errors = exception.message;
        break;
      case exception instanceof ZodError:
        (code = 400), (errors = exception.errors[0].message);
        break;
      case exception instanceof BadRequestException:
        code = 400;
        errors = exception.message;
        break;
      case exception instanceof UnauthorizedException:
        code = 401;
        errors = exception.message;
        break;
      case exception instanceof NotFoundException:
        code = 404;
        errors = exception.message;
        break;
      case exception instanceof ForbiddenException:
        code = 403;
        errors = exception.message;
        break;
      default:
        code = 500;
        errors = 'Internal Server Error';
        break;
    }

    response.status(code).json({
      code,
      errors,
    });
  }
}
