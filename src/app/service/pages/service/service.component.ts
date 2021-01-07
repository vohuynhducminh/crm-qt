import { Component, OnInit } from '@angular/core';
import { CommonServiceVM } from 'src/app/service/models';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  id: string;
  commons: CommonServiceVM[] = [];
  constructor(private router: Router, private authService: AuthGuardService) {
    if (!this.authService.checkAccess(['service', 'show'])) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
