// <!------------------------------------------------------ Interceptor -----------------------------------------------> 
// They can be used to perform various tasks related to HTTP requests and responses, such as adding headers, handling errors, modifying the request or response data, logging, authentication, // (all-interceptors done
// (error-token-spinner)) >> instead of handling in component and service i will make interceptor using this command 
// ng g interceptor error-handling 
// once i create it i need to link it with my project (make it globally) how ??? 
// i will go to app.config.ts and  put this  provideHttpClient(
//   withInterceptors([errorHandlingInterceptor,..........])
// )


import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry, throwError } from 'rxjs';


export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService) // this instead of constructure and injection 


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status == 401) {
        toastr.error('Unauthrized', 'error');
      }
      if (error.status == 404) {
        toastr.error('Not Found', 'error')
      }

      if (error.status == 408) {
        retry(2)
        toastr.error('Network error', 'error')
      }

      if (error.status == 500) {
        toastr.error('Internal Serval Error', 'error')
      }

      if (error.status == 400) {

        
        if(typeof(error.error) != 'string')
        {
          error.error.forEach( (e:any) => {
            toastr.error(e.description)       
          });
        }
        else
        {
         toastr.error(error.error)       
        }
      }



      return throwError(() => error)
    })
  );

};
