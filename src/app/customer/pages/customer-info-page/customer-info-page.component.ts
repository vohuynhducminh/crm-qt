import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-customer-info-page',
  templateUrl: './customer-info-page.component.html',
  styleUrls: ['./customer-info-page.component.scss'],
})
export class CustomerInfoPageComponent implements OnInit {
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthGuardService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.authService.checkAccess(['customer', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }
}
