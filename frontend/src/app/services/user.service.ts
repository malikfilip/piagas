import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  getDoctors(){
    return this.http.get('http://localhost:4000/user/doctors')
  }
  search(nameParam,lastnameParam,specParam){
    const data={
      nameParam:nameParam,
      lastnameParam:lastnameParam,
      specParam : specParam
    }
    return this.http.post('http://localhost:4000/user/search',data)
  }

}

