import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
    moduleId: module.id,
    selector: 'header',
    templateUrl: 'header.component.html',
    providers: [AuthService]
})
export class HeaderComponent {
    public MobileOpen: boolean;

    constructor(private _router: Router,
                private _location: Location,
                private _service: AuthService) { }

    public OnBackClicked() {
        this._location.back();
    }

    public ToggleMobileMenu(): void {
        this.MobileOpen = !this.MobileOpen;
    }

    public Logout(): void {
        localStorage.clear();
        this._router.navigate(['']);
    }

    public IsLoggedIn(): boolean {
        return this._service.IsLoggedIn();
    }

    public CreateNewLead(): void {
        this._router.navigate(['leads/0']);
    }
}
