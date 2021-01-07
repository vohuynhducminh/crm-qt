import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-vt-page',
  templateUrl: './contract-vt-page.component.html',
  styleUrls: ['./contract-vt-page.component.scss'],
})
export class ContractVtPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['telecom', 'contract', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }


}
