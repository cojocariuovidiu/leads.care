import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private _authService: AuthService) {}

  canActivate() {
    return this._authService.IsLoggedIn();
  }
}
