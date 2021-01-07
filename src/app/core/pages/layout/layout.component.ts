import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RootLayoutComponent } from 'src/app/@pages/layouts/root.component';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent extends RootLayoutComponent implements OnInit, OnChanges {
  @Input() isLogin: boolean;
  @Input() userName: string;
  data = [];
  menuLinks: any[] = [

  ];

  ngOnInit() {
    this.changeLayout('sidebar-open');
    // Will sidebar close on screens below 1024
    // this.autoHideMenuPin();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isLogin) {
      this.init();
    }
  }

  init = () => {
    const url = window.location.href.split('#')[1].split('/')[1];
    this.menuLinks = [
      {
        label: 'Trang chủ',
        details: '',
        routerLink: '/dashboard',
        iconType: 'fa',
        iconName: 'home',
      },
    ];
    this.data = [
      {
        data: ['customer', 'show'],
        label: 'Cơ sở dữ liệu đơn vị',
        details: '',
        routerLink: '/customer',
        iconType: 'fa',
        iconName: 'address-card',
      },
      {
        label: 'Quá trình',
        iconType: 'fa',
        iconName: 'pie-chart',
        toggle: url.includes('work-flow') || url === 'form' ? 'open' : 'close',
        submenu: [
          {
            data: ['workflow', 'process', 'show'],
            label: 'Quy trình',
            routerLink: '/work-flow-customer',
            iconType: 'fa',
            iconName: 'sitemap',
          },
          {
            data: ['workflow', 'setting', 'show'],
            label: 'Cấu hình',
            routerLink: '/work-flow-config',
            iconType: 'fa',
            iconName: 'cog',
          },
          {
            data: ['workflow', 'form', 'show'],
            label: 'Biểu mẫu',
            routerLink: '/form',
            iconType: 'fa',
            iconName: 'wpforms',
          },
        ],
      },
      {
        label: 'Nhóm dịch vụ P.KD',
        iconType: 'fa',
        iconName: 'briefcase',
        toggle: url === 'contract' || url === 'revenue' ? 'open' : 'close',
        submenu: [
          {
            data: ['business', 'contract', 'show'],
            label: 'Hợp đồng',
            routerLink: '/contract',
            iconType: 'fa',
            iconName: 'file-text-o',
          },
          {
            data: ['business', 'revenue', 'show'],
            label: 'Doanh thu',
            routerLink: '/revenue',
            iconType: 'fa',
            iconName: 'line-chart',
          },
        ],
      },
      {
        label: 'Kinh doanh viễn thông',
        iconType: 'fa',
        iconName: 'bookmark',
        toggle: url === 'contract-vt' || url === 'contract-cooperation' || url === 'revenue-vt' ? 'open' : 'close',
        submenu: [
          {
            data: ['telecom', 'contract', 'show'],
            label: 'Hợp đồng kinh doanh',
            routerLink: '/contract-vt',
            iconType: 'fa',
            iconName: 'file-text',
          },
          {
            data: ['telecom', 'contract-cooperation', 'show'],
            label: 'Hợp đồng hợp tác',
            routerLink: '/contract-cooperation',
            iconType: 'fa',
            iconName: 'handshake-o',
          },
          {
            data: ['telecom', 'revenue', 'show'],
            label: 'Doanh thu',
            routerLink: '/revenue-vt',
            iconType: 'fa',
            iconName: 'level-up',
          },
        ],
      },
      {
        label: 'Bảo mật',
        iconType: 'fa',
        iconName: 'lock',
        toggle: url === 'security' ? 'open' : 'close',
        submenu: [
          {
            data: ['security', 'group', 'show'],
            label: 'Nhóm',
            routerLink: '/security/group',
            iconType: 'fa',
            iconName: 'users',
          },
          {
            data: ['security', 'user', 'show'],
            label: 'Nhân viên',
            routerLink: '/security/user',
            iconType: 'fa',
            iconName: 'user',
          },
          {
            data: ['security', 'role', 'show'],
            label: 'Tác vụ',
            routerLink: '/security/role',
            iconType: 'fa',
            iconName: 'certificate',
          },
          {
            data: ['security', 'permission', 'show'],
            label: 'Quyền',
            routerLink: '/security/permission',
            iconType: 'fa',
            iconName: 'bullhorn',
          },
        ],
      },
      {
        data: ['service', 'show'],
        label: 'Danh mục dịch vụ VT',
        routerLink: '/service',
        iconType: 'fa',
        iconName: 'truck',
      },
      {
        data: ['account', 'show'],
        label: 'Quản lý tài khoản',
        routerLink: '/account',
        iconType: 'fa',
        iconName: 'cogs',
      },
    ];
    for (let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      if (item.submenu) {
        const submenu = item.submenu;
        item.submenu = [];
        for (let j = 0; j < submenu.length; j++) {
          const sub_item = submenu[j];
          if (this.checkAccess(sub_item.data)) {
            item.submenu.push(sub_item);
          }
        }
        if (item.submenu.length > 0) {
          this.menuLinks.push(item);
        }
      } else {
        if (this.checkAccess(item.data)) {
          this.menuLinks.push(item);
        }
      }
    }
  }
  getRoles = (): { name: string, data: any }[] => {
    const access_roles = environment.access_roles;
    const { roles } = JSON.parse(localStorage.getItem('CRM_TOKEN'));
    const result = [];
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (access_roles.find((access_role) => access_role.name === role)) {
        result.push(access_roles.find((access_role) => access_role.name === role));
      }
    }
    return result;
  }
  checkAccess = (flow: string[]): boolean => {
    const canActive = [];
    for (let i = 0; i < this.getRoles().length; i++) {
      const role = this.getRoles()[i];
      if (this.reCall(flow, role.data[flow[0]])) {
        canActive.push(role.data[flow[0]]);
      }
    }
    return canActive.length > 0;
  }
  reCall = (flow: string[], data: object | boolean): boolean => {
    if (typeof data[flow[1]] === 'object') {
      flow.splice(0, 1);
      return this.reCall(flow, data[flow[0]]);
    } else {
      return data[flow[1]];
    }
  }
}
