import { NgModule } from "@angular/core";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserItemComponent } from "./user-item/user-item.component";
import { UserService } from "./user.service";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "dashboard", component: UserDashboardComponent },
  { path: "users", component: UserListComponent },
  { path: "users/:id", component: UserDetailComponent }
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDetailComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [UserService]
})
export class UserModule {}
