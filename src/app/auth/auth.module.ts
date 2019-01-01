import { NgModule } from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "signin", component: SigninComponent, data: { title: "signin" } },
  { path: "signup", component: SignupComponent, data: { title: "signup" } },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    data: { title: "Reset Password" }
  }
];
@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModule {}
