import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-work-flow-customer-page',
  templateUrl: './work-flow-customer-page.component.html',
  styleUrls: ['./work-flow-customer-page.component.scss'],
})
export class WorkFlowCustomerPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['workflow', 'process', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
