import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ITypeormException } from './typeorm/interfaces';
import * as TYPEORM_ERROR_DICTS from './typeorm/mapped_code.json'; // @NOTE need to import wildcard as ... otherwise it would then return undef xD

interface IExceptionResult {
  found: boolean;
  message?: string;
  statusCode?: number;
  errors?: any;
}

const MAPPED_ERRORS = {}; // empty by default
(function CombinesErrors() {
  //
  // ─── MERGATION ──────────────────────────────────────────────────────────────────
  //
  Object.assign(MAPPED_ERRORS, TYPEORM_ERROR_DICTS);
  // ────────────────────────────────────────────────────────────────────────────────
})(); //IIFE

export function GetProperExceptionResultFromReceivedException(
  exception: unknown,
): IExceptionResult {
  //
  // ─── LOG ────────────────────────────────────────────────────────────────────────
  //
  console.log(exception);
  // ────────────────────────────────────────────────────────────────────────────────

  // TODO All legacy nest exception should be cased here
  if (exception instanceof NotFoundException) {
    return {
      found: true,
      statusCode: exception.getStatus(),
      message: exception.message,
    };
  } else if (exception instanceof BadRequestException) {
    if (exception.hasOwnProperty('message')) {
      const error_message = exception.message;
      if (error_message === 'Validation Error') {
        return {
          found: true,
          statusCode: exception.getStatus(),
          message: exception.message,
          errors: exception.getResponse()['errors'],
        };
      }
    }
  }
  // ────────────────────────────────────────────────────────────────────────────────

  if ((exception as any).code) {
    // Suppose that we found code on the exception
    const { code, detail } = exception as ITypeormException;
    if (!MAPPED_ERRORS.hasOwnProperty(code)) {
      //if not found any mapping from the prepared dict -> return the legacy error
      return {
        found: false, // not found
      };
    }

    // if found prepared mapped code result [The error that we want to expose only]
    return {
      found: true,
      message: MAPPED_ERRORS[code],
      statusCode: 400,
    };
  }

  // ELSES

  //check if exception is instance of HTTPEXCEPTION => forward
  if (exception instanceof HttpException) {
    return {
      found: true,
      message: exception.message,
      statusCode: exception.getStatus(),
    };
  }

  // OTHERWISE
  return { found: false };
}
