import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";

export const DefaultInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return from(authService.isUserLogged()).pipe(
    switchMap((isLogged) => {

      if (!isLogged) {
        return next(request).pipe(errorHandler(authService, router));
      }

      return from(authService.getTokenFromStorage()).pipe(
        switchMap((token) => {
          let modifiedRequest = request;

          if (token) {
            modifiedRequest = request.clone({
              headers: request.headers.set(
                'Authorization',
                `Bearer ${token}`
              ),
            });
          }

          return next(modifiedRequest).pipe(errorHandler(authService, router));
        })
      );
    })
  );
};

function errorHandler(
  authService: AuthenticationService,
  router: Router
) {
  return tap<HttpEvent<unknown>>({
    error: (error: any) => {
      if (error.status === 401) {
        authService.logOut('login');
      } else if (error.status === 403) {
        router.navigateByUrl('forbidden');
      } else if (error.status === 500) {
        router.navigateByUrl('error');
      }
    }
  });
}
