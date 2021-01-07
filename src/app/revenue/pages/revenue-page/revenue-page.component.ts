import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-revenue-page',
  templateUrl: './revenue-page.component.html',
  styleUrls: ['./revenue-page.component.scss'],
})
export class RevenuePageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['business', 'revenue', 'show'])) {
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
