import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '@ouakala-workspace/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
@Component({
    selector: 'admin-user-form',
    templateUrl: './user-form.component.html',
    styles: []
})
export class UserFormComponent implements OnInit {
    public user!: User;
    public countries:{ id: string; name: string; }[] = [];
    public userForm!: FormGroup;
    public editMode = false;
    public showSpinner = false;
    public isSubmitted = false;

    constructor(
        private _userService: UserService,
        private _messageService: MessageService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.buildUserForm();
        this.checkEditMode();
        this.getCountries();
    }

    private buildUserForm() {
        this.userForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required]),
            isAdmin: new FormControl(false, [Validators.required]),
            street: new FormControl('', []),
            apartment: new FormControl('', []),
            zip: new FormControl('', []),
            city: new FormControl('', []),
            country: new FormControl('', [])
        });
    }

    get userFromControls(): { [key: string]: AbstractControl } {
        return this.userForm.controls;
    }

    private getCountries() {
      this.countries = this._userService.getCountries();
    }

    public onSubmit() {
        if (!this.editMode) {
            this.saveUser();
        } else {
            this.updateUser();
        }
    }
    private saveUser() {
        this.isSubmitted = true;

        if (this.userForm.valid) {
            this.showSpinner = true;

            this.user = new User();
            this.user.name = this.userFromControls['name'].value;
            this.user.password = this.userFromControls['password'].value;
            this.user.email = this.userFromControls['email'].value;
            this.user.phone = this.userFromControls['phone'].value;
            this.user.isAdmin = this.userFromControls['isAdmin'].value;
            this.user.street = this.userFromControls['street'].value;
            this.user.apartment = this.userFromControls['apartment'].value;
            this.user.zip = this.userFromControls['zip'].value;
            this.user.city = this.userFromControls['city'].value;
            this.user.country = this.userFromControls['country'].value;

            this._userService.createUser(this.user).subscribe(
                (response) => {
                    this.showSpinner = false;
                    this.isSubmitted = false;
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: '(' + response.name + ') has ben saved successfully'
                    });
                    setTimeout(() => {
                        this._router.navigateByUrl('/users');
                    }, 2000);
                },
                (error) => {
                    this.showSpinner = false;
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                }
            );
        }
    }

    private updateUser() {
        this.isSubmitted = true;

        if (this.userForm.valid) {
            this.showSpinner = true;

            this.user.name = this.userFromControls['name'].value;
            this.user.password = this.userFromControls['password'].value;
            this.user.email = this.userFromControls['email'].value;
            this.user.phone = this.userFromControls['phone'].value;
            this.user.isAdmin = this.userFromControls['isAdmin'].value;
            this.user.street = this.userFromControls['street'].value;
            this.user.apartment = this.userFromControls['apartment'].value;
            this.user.zip = this.userFromControls['zip'].value;
            this.user.city = this.userFromControls['city'].value;
            this.user.country = this.userFromControls['country'].value;

            if (this.user.id) {
                this._userService.updateUser(this.user, this.user.id).subscribe(
                    (response) => {
                        this.showSpinner = false;
                        this.isSubmitted = false;
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: '(' + response.name + ') has ben updated successfully'
                        });
                        setTimeout(() => {
                            this._router.navigateByUrl('/users');
                        }, 2000);
                    },
                    (error) => {
                        this.showSpinner = false;
                        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                    }
                );
            }
        }
    }

    private checkEditMode() {
        this._activatedRoute.params.subscribe((params) => {
            const userId = params['userId'];
            if (userId) {
                this.editMode = true;

                this._userService.getUserById(userId).subscribe((response) => {
                    this.user = response;
                    this.userFromControls['name'].setValue(this.user.name);
                    this.userFromControls['email'].setValue(this.user.email);
                    this.userFromControls['phone'].setValue(this.user.phone);
                    this.userFromControls['isAdmin'].setValue(this.user.isAdmin);
                    this.userFromControls['street'].setValue(this.user.street);
                    this.userFromControls['apartment'].setValue(this.user.apartment);
                    this.userFromControls['zip'].setValue(this.user.zip);
                    this.userFromControls['city'].setValue(this.user.city);
                    this.userFromControls['country'].setValue(this.user.country);
                    this.userFromControls['password'].setValue(this.user.password);
                    this.userFromControls['password'].setValidators([]);
                    this.userFromControls['password'].updateValueAndValidity();
                });
            }
        });
    }

    public onCancel() {
        this._location.back();
    }
}
