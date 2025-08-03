import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/common/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  const url = req.url.toLowerCase();
  if (url.includes('hotel')) {
    spinnerService.showLoader('hotel', req.body);
  } else if (url.includes('flight')) {
    spinnerService.showLoader('flight');
  }

  return next(req).pipe(
    finalize(() => spinnerService.hideLoader())
  );
};
