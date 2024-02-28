import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { last } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Req } from '../models/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: LoginService, private http: HttpClient,private rt:Router) { }

  username: string;
  password: string;
  name: string;
  lastname: string;
  address: string;
  phone: string;
  mail: string;
  errorUser: string;
  errorMail: string;
  noError: string;
  confirm: string;
  picture = null;
  dis;

  ngOnInit(): void {
  }
  register() {

    this.service.register(this.username, this.password, this.name, this.lastname, this.address, this.phone, this.mail, this.picture).subscribe(res => {
      this.errorMail = res['errorUser'], this.errorUser = res['errorMail'], this.noError = "";
      if (this.errorMail == "" && this.errorUser == "") this.noError = "The registration request has been sent."
      this.display(this.username);
    })
    this.ngOnInit()
  }
  regex(text): boolean {
    var pattern1 = new RegExp(/^(?!.*(.)\1)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,14}$/);
    var patter2 = new RegExp(/^[a-zA-Z].*$/)
    return (pattern1.test(text) && patter2.test(text))
  }
  addPicture(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () =>{
          if(img.width > 300 || img.height > 300 || img.width < 100 || img.height < 100){
            alert("Picture resolution does not meet the requirements ")
    
          }
          else
          {
            this.picture = event.target.result;
          }  
        }
        img.src = event.target.result
      }
    }
  }
  display(usernamex) {
    this.service.display(usernamex).subscribe((request: Req) => {
      this.dis = request.picture
    })
  }
  removePicture(){
    this.picture=null
  }
  back(){
    this.rt.navigate([''])
  }

}
//Aa1!abBcC
