import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoaderService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading('true');
    let path = window.location.pathname.substring(0);
    let storedPath: any = localStorage.getItem('path') || '';
    if (!storedPath?.split(',').includes(path)) {
      storedPath ? localStorage.setItem('path', path + ',' + storedPath) : localStorage.setItem('path', path);
    }
    const token = localStorage.getItem('token');
    let nextHandle = next.handle(req);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      nextHandle = next.handle(cloned);
    }
    return nextHandle.pipe(
      tap(
        (response: any) => {
          if (response instanceof HttpResponse && response.ok) {
            this.loadingService.setLoading('false');
            this.setPath(storedPath, path);
          }
          return response;
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse && (err.status === 403 || err.status === 401)) {
            this.router.navigate(['']);
            this.loadingService.setLoading('false');
            this.setPath(storedPath, path);
          } else {
            this.loadingService.setLoading('false');
            this.setPath(storedPath, path);
          }
        }
      )
    );
  }

  setPath(storedPath: string, path: string) {
    if (storedPath) {
      localStorage.setItem('path', this.removeValue(storedPath, path));
    }
  }

  removeValue(list: string, value: string) {
    return list.replace(new RegExp(',?' + value + ',?'), function (match) {
      var first_comma = match.charAt(0) === ',',
        second_comma;

      if (first_comma && (second_comma = match.charAt(match.length - 1) === ',')) {
        return ',';
      }
      return '';
    });
  }
}
