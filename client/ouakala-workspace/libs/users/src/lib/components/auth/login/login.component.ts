import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { LocalStorageService } from '../../../services/local-storage.service';
@Component({
    selector: 'users-login',
    templateUrl: './login.component.html'
    // styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    public loginFormGroup!: FormGroup;
    public isSubmitted = false;
    public authError = false;
    public authMessage = '';
    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _authenticationService: AuthenticationService,
        private _localStorageService: LocalStorageService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.buildLoginForm();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    private buildLoginForm() {
        this.loginFormGroup = this._formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    get loginFromControls(): { [key: string]: AbstractControl } {
        return this.loginFormGroup.controls;
    }

    public onSubmit() {
        this.isSubmitted = true;
        if (this.loginFormGroup.invalid) return;

        const email = this.loginFormGroup.controls['email'].value;
        const password = this.loginFormGroup.controls['password'].value;

        this._authenticationService
            .login(email, password)
            .pipe(takeUntil(this.endSubscription$))
            .subscribe(
                (response) => {
                    this.isSubmitted = false;
                    this.authError = false;
                    this._localStorageService.setToken(response.token as string);
                    this._router.navigate(['/']);
                },
                (error) => {
                    this.authError = true;
                    if (error.status !== 400) {
                        this.authMessage = 'Error in the server, please try again later.';
                    }
                }
            );
    }
}
