import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const authReq = req.clone({
    setHeaders: {
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });

  return next(authReq);
};
