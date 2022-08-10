import { RegisterComponent } from "./components/auth/register/register.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatHomeComponent } from "./components/chat/chat-home/chat-home.component";
import { AuthGuard } from "./services/auth/auth.guard";
const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'chat', component: ChatHomeComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
