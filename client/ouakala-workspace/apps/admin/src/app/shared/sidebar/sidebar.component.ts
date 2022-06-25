import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@ouakala-workspace/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
    // styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(private _authenticationService: AuthenticationService) {}

    ngOnInit(): void {}

    public onLogout() {
        this._authenticationService.logout();
    }
}
