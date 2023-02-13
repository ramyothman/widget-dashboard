import { NotificationService } from './../services/notification.service';
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Logger } from '../services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralErrorHandler implements ErrorHandler {
  appLogger = new Logger('GeneralErrorHandler');
  constructor(private notifService: NotificationService) { }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      
      // Server error happened
      if (!navigator.onLine) {
        // No Internet connection
        this.notifService.error('General.ConnectionLost');
      }

      // Http Error
      if ((error as HttpErrorResponse)['status'] === 504) {
        this.notifService.error('General.ServerError', [
          'ErrorMessage.BadGatewayErrorName',
          'ErrorMessage.BadGatewayErrorDetails',
        ]);
      } else {
        if (error && error['status'] === 200) {
          if (!error['url']?.includes('authenticate')) {
            this.notifService.error('General.ServerError', error['error']);
          }
        } else {
          this.notifService.error('General.ServerError', [
            error['name'] ? `${error.name}` : (null as any),
            error.message,
          ]);
        }
      }

      this.appLogger.error(`${error['status']} - ${error.message}`);
    } else {
      // Client Error Happend
      if (
        error.message &&
        error.message.includes('ExpressionChangedAfterItHasBeenCheckedError')
      ) {
        return { name: 'General.ByPass', message: error.message } as Error;
      }
      this.appLogger.error(`${error.message}`);
      this.notifService.error(
        `${error instanceof TypeError ? 'General.ClientError' : error.name}`,
        error.message
      );
    }
    return throwError(error.message);
  }
}
