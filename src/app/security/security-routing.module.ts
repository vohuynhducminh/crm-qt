import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { RolePageComponent } from './pages/role-page/role-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuardService] },
  { path: 'group', component: GroupPageComponent, canActivate: [AuthGuardService] },
  { path: 'role', component: RolePageComponent, canActivate: [AuthGuardService] },
  { path: 'permission', component: PermissionPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }
