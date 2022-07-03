import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../models/user';


export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
}

// export interface UsersPartialState {
//     readonly [USERS_FEATURE_KEY]: UserState;
// }

export const initialUserState: UserState = {
    user: null,
    isAuthenticated: false
};

const usersReducer = createReducer(
    initialUserState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({ ...state, user: action.user, isAuthenticated: true })),
    on(UsersActions.buildUserSessionFailed, (state) => ({ ...state, user: null, isAuthenticated: false }))
    // on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: UserState | undefined, action: Action) {
    return usersReducer(state, action);
}
