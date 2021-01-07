import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-revenue-vt-page',
  templateUrl: './revenue-vt-page.component.html',
  styleUrls: ['./revenue-vt-page.component.scss'],
})
export class RevenueVtPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['telecom', 'revenue', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }
  checkAccess = (group: string, attribute: string): boolean => {
    const access_roles = environment.access_roles;
    const { roles } = JSON.parse(localStorage.getItem('CRM_TOKEN'));
    const canActive: string[] = [];

    access_roles.map((access_role) => {
      if (roles.indexOf(access_role.name) > -1) {
        const obj = access_role.data[group];
        const check = obj[attribute];
        if (check) {
          canActive.push(attribute);
        }
      }
    });
    return canActive.length > 0;
  }
}
