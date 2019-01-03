import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {}

  resetPassword() {
    return this._auth
      .resetPassword(this.email)
      .then(_ => this.router.navigate(["../signin"]));
  }
}
