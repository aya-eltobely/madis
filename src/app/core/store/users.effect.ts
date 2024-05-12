import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { loadUser, loadUserFailure, loadUserSuccess, searchUserById, searchUserByIdFailure, searchUserByIdSuccess } from './users.action';
import { UserService } from '../../pages/users/services/user.service';

@Injectable()
export class UserEffect {
  
  constructor(
    private userService: UserService,
    private action$: Actions,
    private snackBar: MatSnackBar // Corrected variable name
  ){}

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUser),
      exhaustMap((action:any) =>
        this.userService.getAllUsers(action.page, action.pageSize).pipe(
          map((data: any) => loadUserSuccess({ list: data })),
          catchError((err: any) => {
            this.snackBar.open('Failed to load data', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            return of(loadUserFailure({ errorMessage: err }));
          })
        )
      )
    )
  );

  searchUserById$ = createEffect(() =>
  this.action$.pipe(
    ofType(searchUserById),
    mergeMap(action =>
      this.userService.searchByUserId(action.id).pipe(
        map(user => searchUserByIdSuccess({ user })),
        catchError(error => of(searchUserByIdFailure({ errorMessage: error.message })))
      )
    )
  )
);
}
