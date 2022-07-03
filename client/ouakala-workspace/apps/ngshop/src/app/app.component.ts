import { Component, OnInit } from '@angular/core';
import { UserService } from '@ouakala-workspace/users';

@Component({
    selector: 'ngshop-root',
    templateUrl: './app.component.html'
    // styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ngshop';

    constructor(private _userService: UserService) {}

    ngOnInit(): void {
        this._userService.initAppSession();
    }
}
