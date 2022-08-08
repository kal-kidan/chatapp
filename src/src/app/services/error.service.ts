import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    let message = 'Error Occured.';
    if (navigator.onLine) {
      if (error.error) {
        message = error.error.message ? error.error.message : message;
      }
    } else {
      message = 'No Internet Connection';
    }
    return message;
  }

  getStackTrace(error: Error) {
    return error.stack ? error.stack : '';
  }
}
