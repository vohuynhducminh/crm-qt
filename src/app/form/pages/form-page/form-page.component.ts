import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['workflow', 'form', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
