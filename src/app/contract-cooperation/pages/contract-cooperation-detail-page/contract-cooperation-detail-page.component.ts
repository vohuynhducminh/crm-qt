import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractCooperation } from 'src/app/contract-cooperation/models';
import { ContractCooperationService } from 'src/app/contract-cooperation/services';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-contract-cooperation-detail-page',
  templateUrl: './contract-cooperation-detail-page.component.html',
  styleUrls: ['./contract-cooperation-detail-page.component.scss'],
})
export class ContractCooperationDetailPageComponent implements OnInit {
  contractCooperation: ContractCooperation;
  constructor(private route: ActivatedRoute, private contractCooperationService: ContractCooperationService, private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['telecom', 'contract-cooperation', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractCooperationService.getById(params['id']).then((res) => this.contractCooperation = res);
    });

  }
}
