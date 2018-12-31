import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    data: { title: "reset-password" }
  }
];
@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule {}
