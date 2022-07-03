import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
    user: null,
    isAuthenticated: false
};

const usersReducer = createReducer(
    initialUserState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    // on(UsersActions.loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, { ...state, loaded: true })),
    // on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: UserState | undefined, action: Action) {
    return usersReducer(state, action);
}
