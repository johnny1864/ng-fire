import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss", "../auth.style.scss"]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide: boolean = true;

  constructor(
    public fb: FormBuilder,
    public _auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
      ]
    });
  }

  ngOnInit() {}

  get email() {
    return this.signUpForm.get("email");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  signIn() {
    return this._auth
      .emailSignUp(this.email.value, this.password.value)
      .then(user => {
        if (this.signUpForm.valid) {
          this.router.navigate(["/"]);
        }
      });
  }
}
