import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-page',
  template: `
    <div class="full-view-height"></div>
  `,
  styles: [
    `
      .full-view-height {
        height: calc(100vh - 119px);
      }
    `,
  ],
})
export class EmptyPageComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    swal({
      title: 'Updating Permissions',
      text: 'This feature may take a long time. Be patient!',
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        swal.showLoading();
        this.globalService.updatePermissions()
          .then(
            () => {
              swal.close();
              this.router.navigate(['/dashboard']);
            },
            error => {
              console.error(error);
              swal.close();
              swal({
                title: 'Error',
                text: 'An error occurred when perform this task!',
                type: 'error',
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then(
                () => {
                  this.router.navigate(['/dashboard']);
                }
              );
            }
          );
      },
    });
  }

}
