import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {



    constructor(private readonly store: Store) {}

    buildUserSession() {
        this.store.dispatch(UsersActions.buildUserSession());
    }
}
