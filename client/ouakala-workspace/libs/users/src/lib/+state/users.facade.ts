import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
    constructor(private readonly store: Store) {}

    public currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
    public isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuthenticated));
    buildUserSession() {
        this.store.dispatch(UsersActions.buildUserSession());
    }
}
