import { Injectable }     from '@angular/core';
import { CanActivate , Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot }    from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.userService.logged) { return true; }

    // Store the attempted URL for redirecting
    this.userService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/unauthorized']);
    return false;
  }
}