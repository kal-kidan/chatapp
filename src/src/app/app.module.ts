import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './error-handler';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ChatHomeComponent } from './components/chat/chat-home/chat-home.component';
import { UsersComponent } from './components/chat/users/users.component';
import { MessagesComponent } from './components/chat/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChatHomeComponent,
    UsersComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    GlobalErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
