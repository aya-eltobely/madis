import { createAction, props } from "@ngrx/store";
import { user } from "./user.model";


// Action to load users with pagination
export const loadUser = createAction(
    '[User] Load Users',
    props<{ page: number, pageSize: number }>()
);

// Action to handle successful user loading
export const loadUserSuccess = createAction(
    '[User] Load Users Success',
    props<{ list: any[] }>() // Update with your actual user type
);

// Action to handle failed user loading
export const loadUserFailure = createAction(
    '[User] Load Users Failure',
    props<{ errorMessage: string }>()
);

export const searchUserById = createAction(
    '[User] Search User By ID',
    props<{ id: number }>()
);

export const searchUserByIdSuccess = createAction(
    '[User] Search User By ID Success',
    props<{ user: user }>()
);

export const searchUserByIdFailure = createAction(
    '[User] Search User By ID Failure',
    props<{ errorMessage: string }>()
);