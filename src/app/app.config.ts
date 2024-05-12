import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorHandlingInterceptor } from './core/interceptors/error-handling.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideStore } from '@ngrx/store';
import { userReducer } from './core/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './core/store/users.effect';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions()),
  provideHttpClient(
    withInterceptors([
    errorHandlingInterceptor,
    loaderInterceptor
  ])),
  provideAnimationsAsync(),
  provideToastr(),
  NgxSpinnerModule,
  provideStore({'user':userReducer}),
  provideEffects([UserEffect])
]
};
