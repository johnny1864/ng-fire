import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/users", pathMatch: "full" },
  { path: "", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "**", redirectTo: "/users", pathMatch: "full" }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
