import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.init),
            fetch({
                run: (action) => {
                    // Your custom service 'load' logic goes here. For now just return a success action...
                    return UsersActions.loadUsersSuccess({ users: [] });
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return UsersActions.loadUsersFailure({ error });
                }
            })
        )
    );

    constructor(private readonly actions$: Actions) {}
}
