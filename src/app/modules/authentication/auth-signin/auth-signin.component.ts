import { AuthenticationService } from "./../../../shared/services/authentication.service";
import { Login } from "./../../../shared/models/login";
import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { user } from "src/app/shared/models/user";

@Component({
  selector: "app-auth-signin",
  templateUrl: "./auth-signin.component.html",
  styleUrls: ["./auth-signin.component.scss"]
})
export class AuthSigninComponent implements OnInit {
  strongMessage: string = "";
  eventMessage: string = "";
  userinfoObj = new user();
  loginObj = new Login();
  message: string;
  isMessage: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private elem: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  signIn() {
    this.authService.login(this.loginObj).subscribe(
      data => {
        localStorage.setItem("user", JSON.stringify(data));
        this.router.navigate(["/interview"]);
      },
      error => {
        this.strongMessage = "Invalid credentials!";
        this.eventMessage = "";
        var element = this.elem.nativeElement
          .querySelectorAll("#divErrorSuccessMessage")
          .item(0);
        this.renderer.removeClass(element, "hidden");
      }
    );
  }
}
