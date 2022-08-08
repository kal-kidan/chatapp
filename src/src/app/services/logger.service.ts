import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logError(message: string, stack: any) {
    console.error('LoggingService: ' + message);
    console.error(stack);
  }
}
