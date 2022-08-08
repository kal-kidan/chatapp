import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './services/logger.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { environment } from 'src/environments/environment'; 
import { LoaderService } from './services/loader.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler { 
  constructor(private injector: Injector, private loaderService: LoaderService) { 
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggerService);
    const notifier = this.injector.get(NotificationService);
    let isOnProduction = environment.production;
    let message;
    let stackTrace: any;
    let sendToGCP = true;
    if (!navigator.onLine) {
      return notifier.showError('No Internet Connection.');
    }
    if (error instanceof HttpErrorResponse) {
      stackTrace = errorService.getStackTrace(error);
      message = errorService.getServerErrorMessage(error);
      if (error.status === 500) {
        notifier.showError('Server error occured please try again.');
      } else if (error.status === 403) {
        notifier.showError('Permission denied, user is not allowed to view this page.');
      } else if (error.status === 404) {
        window.location.href = '/error';
      } else if (error.status.toString().startsWith('400')) {
        sendToGCP = false;
        notifier.showError(message);
      } else {
        notifier.showError(message);
      }
    } else {
      stackTrace = errorService.getStackTrace(error);
      message = errorService.getClientErrorMessage(error);
      return isOnProduction ? this.logErrorToGCP(error) : logger.logError(message, stackTrace);
    }

    if (isOnProduction) {
      if (sendToGCP) {
        this.logErrorToGCP(error);
      }
    } else {
      logger.logError(message, stackTrace);
    }
  }

  logErrorToGCP(error: any) {
    // report error to prod
  }
}
