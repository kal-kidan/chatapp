import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public rootUrl = 'http://localhost:3000/v1';
  constructor(private _http: HttpClient) {}
  logIn(data: any) {
    return this._http.post(`${this.rootUrl}/auth/login`, {email: data.username, password: data.password});
  }
  register(data: any) {
    return this._http.post(`${this.rootUrl}/auth/register`, {name: data.name, email: data.email, password: data.password});
  }
  getReceivers(userId: string){
    return this._http.post(`${this.rootUrl}/chat/recievers`, {userId});
  }
  getMessages(roomId: string, page: number, limit: number){
    return this._http.get(`${this.rootUrl}/chat/messages`, {params: {
      roomId, page, limit
    }});
  }

  searchUser(keyword: string){
    return this._http.get(`${this.rootUrl}/users/${keyword}`);
  }
}
