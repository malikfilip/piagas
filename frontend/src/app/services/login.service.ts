import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/userModer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(username,password){
    const data={
      username:username,
      password:password,
    }
    return this.http.post('http://localhost:4000/user/login',data)
  }

  register(un,pw,nm,ln,ad,ph,em,pc){
    const data = {
      username:un,
      password : pw,
      name : nm,
      lastname: ln,
      address: ad,
      phone:ph,
      mail:em,
      picture:pc
    }
    return this.http.post('http://localhost:4000/user/register',data)
  }
  display(un){
    const data = {username:un}
    return this.http.post('http://localhost:4000/user/display',data)
  }
  changePassword(un,pw){
    const data = {username:un,password:pw}
    return this.http.post('http://localhost:4000/user/change',data)
  }



}
