import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRevoxModule } from '../@pages/pages-revox.module';

import { SecurityRoutingModule } from './security-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { RolePageComponent } from './pages/role-page/role-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { CreateGroupComponent } from './components/group/create-group/create-group.component';
import { EditGroupComponent } from './components/group/edit-group/edit-group.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { EditRoleComponent } from './components/role/edit-role/edit-role.component';
import { CreatePermissionComponent } from './components/permission/create-permission/create-permission.component';
import { EditPermissionComponent } from './components/permission/edit-permission/edit-permission.component';
import { PermissionOfRoleComponent } from './components/permission-of-role/permission-of-role/permission-of-role.component';
import { EditPermissionOfRoleComponent } from './components/permission-of-role/edit-permission-of-role/edit-permission-of-role.component';
import { CreatePermissionOfRoleComponent } from './components/permission-of-role/create-permission-of-role/create-permission-of-role.component';
import { RoleComponent } from './components/role/role/role.component';
import { UserComponent } from './components/user/user/user.component';
import { GroupComponent } from './components/group/group/group.component';
import { RoleOfGroupComponent } from './components/role-of-group/role-of-group/role-of-group.component';
import { CreateRoleOfGroupComponent } from './components/role-of-group/create-role-of-group/create-role-of-group.component';
import { EditRoleOfGroupComponent } from './components/role-of-group/edit-role-of-group/edit-role-of-group.component';
import { RoleOfUserComponent } from './components/role-of-user/role-of-user/role-of-user.component';
import { CreateRoleOfUserComponent } from './components/role-of-user/create-role-of-user/create-role-of-user.component';
import { EditRoleOfUserComponent } from './components/role-of-user/edit-role-of-user/edit-role-of-user.component';
import { GroupOfUserComponent } from './components/group-of-user/group-of-user/group-of-user.component';
import { CreateGroupOfUserComponent } from './components/group-of-user/create-group-of-user/create-group-of-user.component';
import { EditGroupOfUserComponent } from './components/group-of-user/edit-group-of-user/edit-group-of-user.component';
import { UserOfGroupComponent } from './components/user-of-group/user-of-group/user-of-group.component';
import { CreateUserOfGroupComponent } from './components/user-of-group/create-user-of-group/create-user-of-group.component';
import { EditUserOfGroupComponent } from './components/user-of-group/edit-user-of-group/edit-user-of-group.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    UserPageComponent,
    GroupPageComponent,
    RolePageComponent,
    PermissionPageComponent,
    CreateUserComponent,
    CreateGroupComponent,
    CreateRoleComponent,
    CreatePermissionComponent,
    EditPermissionComponent,
    EditGroupComponent,
    EditUserComponent,
    EditRoleComponent,
    PermissionOfRoleComponent,
    CreatePermissionOfRoleComponent,
    EditPermissionOfRoleComponent,
    RoleComponent,
    UserComponent,
    GroupComponent,
    RoleOfGroupComponent,
    CreateRoleOfGroupComponent,
    EditRoleOfGroupComponent,
    RoleOfUserComponent,
    CreateRoleOfUserComponent,
    EditRoleOfUserComponent,
    GroupOfUserComponent,
    CreateGroupOfUserComponent,
    EditGroupOfUserComponent,
    UserOfGroupComponent,
    CreateUserOfGroupComponent,
    EditUserOfGroupComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SecurityRoutingModule,
    PagesRevoxModule,
    FormsModule,
  ],
  bootstrap: [
    EditPermissionComponent,
    EditGroupComponent,
    EditUserComponent,
    EditRoleComponent,
    EditPermissionOfRoleComponent,
  ],
})
export class SecurityModule { }
