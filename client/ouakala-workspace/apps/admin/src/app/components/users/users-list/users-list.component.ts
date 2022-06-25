import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '@ouakala-workspace/users';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {
    public users: User[] = [];
    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getCountryName(countryCode: string) {
        let countryName = 'Not Found';
        if (countryCode) {
            countryName = this._userService.getCountry(countryCode);
            return countryName;
        }
        return countryName;
    }

    public getUsers() {
        return this._userService
            .getUsers()
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.users = response;
            });
    }

    onUpdateUser(userId: string) {
        this._router.navigate(['/users/user-from/', userId]);
    }

    onDeleteUser(userId: string) {
        this._confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._userService
                    .deleteUser(userId)
                    .pipe(takeUntil(this.endSubscription$))
                    .subscribe(
                        (response) => {
                            this.getUsers();
                            this._messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'User has ben deleted successfully'
                            });
                        },
                        (error) => {
                            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                        }
                    );
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this._messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }
}
