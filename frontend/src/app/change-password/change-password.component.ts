import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/userModer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: LoginService,private rt:Router) { }
  user: User = JSON.parse(sessionStorage.getItem('user'))
  errorRegex = ""
  errorOld = ""
  errorConfirm = ""
  passwordChanged = ""
  ngOnInit(): void {
  }

  changePassword(current, newPw, confirm) {
    //console.log(current, this.user.password)
    this.errorConfirm = this.errorOld = this.errorRegex = this.passwordChanged = ""
    if (current != this.user.password) this.errorOld = "Your old password is not correct."
    if (this.regex(newPw)) {
      if (newPw == confirm) {
        if (this.errorOld == "") {
          this.service.changePassword(this.user.username, newPw).subscribe(() => {
            alert("Dear " + this.user.name +" "+this.user.lastname+  ", your password is successfully changed !");
            this.rt.navigate(['login'])
          })
        }


      } else this.errorConfirm = "Passwords do not match."

    }
    else this.errorRegex = "Your new password does not match the pattern."

  }
  regex(text): boolean {
    var pattern1 = new RegExp(/^(?!.*(.)\1)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,14}$/);
    var patter2 = new RegExp(/^[a-zA-Z].*$/)
    return (pattern1.test(text) && patter2.test(text))
  }

  back(){
    this.rt.navigate([''])
  }

}
