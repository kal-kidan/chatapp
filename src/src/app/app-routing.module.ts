import { RegisterComponent } from "./components/auth/register/register.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: RegisterComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
