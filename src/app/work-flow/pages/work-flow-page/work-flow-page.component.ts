import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-work-flow-page',
  templateUrl: './work-flow-page.component.html',
  styleUrls: ['./work-flow-page.component.scss'],
})
export class WorkFlowPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['workflow', 'setting', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
