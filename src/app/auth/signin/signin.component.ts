import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss", "../auth.style.scss"]
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) {
    this.signInForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {}

  get email() {
    return this.signInForm.get("email");
  }

  get password() {
    return this.signInForm.get("password");
  }

  signIn() {
    return this._auth
      .emailSignIn(this.email.value, this.password.value)
      .then(user => {
        if (this.signInForm.valid) {
          this.router.navigate(["/"]);
        }
      });
  }
}
