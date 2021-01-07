import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-info-page',
  templateUrl: './contract-info-page.component.html',
  styleUrls: ['./contract-info-page.component.scss'],
})
export class ContractInfoPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['business', 'contract', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
