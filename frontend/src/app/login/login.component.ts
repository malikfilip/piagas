import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/userModer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginService,private rt:Router) { }

  ngOnInit(): void {
  }
  username:string;
  password:string;
  errorMessage:string = "";

  login(){
    this.service.login(this.username,this.password).subscribe((tmp:User)=>{
      if(tmp){
        sessionStorage.setItem('user',JSON.stringify(tmp));
        switch(tmp.type){
          case 'doctor':this.rt.navigate(['dHome']);break;
          case 'patient':this.rt.navigate(['pHome']);break;
          case 'manager':this.rt.navigate(['']);break;
        }
      }
      this.errorMessage = "Invalid credentials, please try again."
    })
  }
  register(){
    this.rt.navigate(['']);
  }



}
