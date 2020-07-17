import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  // Activateroutesnapchot = futur appelé  ,  RoutrStatesnapshot = contient le futur etat du routeur qui devra passer la verification du guard 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn) { return true; }
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);

      return false;
  }
}
