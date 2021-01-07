import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Token } from 'src/app/authorize/models/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token: Token = this.getToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  setToken(token: Token, userName: string): void {
    localStorage.setItem(environment.token, JSON.stringify(token));
    localStorage.setItem(`${environment.token}_username`, userName);
  }

  getToken(): Token {
    let token: Token;
    try {
      token = JSON.parse(localStorage.getItem(environment.token));
    } catch (e) {
    }
    return token;
  }

  clearToken(): void {
    localStorage.clear();
  }

  getUserName(): string {
    return localStorage.getItem(`${environment.token}_username`);
  }

  getRoles = (): { name: string, data: any }[] => {
    const access_roles = environment.access_roles;
    const { roles } = JSON.parse(localStorage.getItem('CRM_TOKEN'));
    const result = [];
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (access_roles.find((access_role) => access_role.name === role)) {
        result.push(access_roles.find((access_role) => access_role.name === role));
      }
    }
    return result;
  }
  checkAccess = (flow: string[]): boolean => {
    const canActive = [];
    for (let i = 0; i < this.getRoles().length; i++) {
      const role = this.getRoles()[i];
      if (this.reCall(flow, role.data[flow[0]])) {
        canActive.push(role.data[flow[0]]);
      }
    }
    return canActive.length > 0;
  }
  reCall = (flow: string[], data: object | boolean): boolean => {
    if (typeof data[flow[1]] === 'object') {
      flow.splice(0, 1);
      return this.reCall(flow, data[flow[0]]);
    } else {
      return data[flow[1]];
    }
  }
}
