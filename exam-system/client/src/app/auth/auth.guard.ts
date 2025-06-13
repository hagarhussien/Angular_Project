import { inject, Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


function isPlatformBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}


@Injectable({ providedIn: 'root' })
export class AuthGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = isPlatformBrowser()
      ? localStorage.getItem('role')
      : null;

    const allowedRoles = route.data['roles'] as string[];

    if (!allowedRoles || !role) return false;
    return allowedRoles.includes(role);
  }
}

// Export guard function
export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};