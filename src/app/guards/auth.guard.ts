import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                console.log("Hola desde guard " + this.authService.isAuthenticated)
    if (this.authService.isAuthenticated_forGuard) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    // return new Promise((resolve, reject) => {
    //   this.authService.isAuthenticated.subscribe(estado => {
    //     if(estado){
    //       console.log("Hola desde guard " + estado)
    //       resolve (true);
    //     }else{
    //       console.log("Hola desde guard 2" + estado)
    //       this.router.navigate(['/login'])
    //       resolve (false);
    //     }
    //   });
    // })
  }
  
}
