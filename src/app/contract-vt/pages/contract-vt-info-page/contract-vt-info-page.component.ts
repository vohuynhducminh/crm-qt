import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-vt-info-page',
  templateUrl: './contract-vt-info-page.component.html',
  styleUrls: ['./contract-vt-info-page.component.scss'],
})
export class ContractVtInfoPageComponent implements OnInit {

  constructor(private router: Router, public authService: AuthGuardService) {
    if (!this.authService.checkAccess(['telecom', 'contract', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }
}
