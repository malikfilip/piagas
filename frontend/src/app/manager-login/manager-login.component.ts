import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';
import { User } from '../models/userModer';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(private service: LoginService, private rt: Router) { }

  ngOnInit(): void {
  }
  username: string;
  password: string;
  errorMessage: string;
  

  login() {
    this.service.login(this.username, this.password).subscribe((tmp: User) => {
      if (tmp) {
        if (tmp.type != 'manager') {
          this.rt.navigate(['']);
          alert("You are not a manager !");
        }
        else {
          sessionStorage.setItem('user', JSON.stringify(tmp));
          this.rt.navigate(['manager'])
        }
      }
      else this.errorMessage = "Invalid credentials, please try again.";
    })
  }

}
