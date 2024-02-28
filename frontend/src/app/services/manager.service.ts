import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:4000/manager/users')
  } 

  getSpecs() {
    return this.http.get('http://localhost:4000/manager/spec')
  }

  register(un,pw,nm,ln,ad,ph,em,pc,lic,spec,room){
    const data = {
      username:un,
      password : pw,
      name : nm,
      lastname: ln,
      address: ad,
      phone:ph,
      mail:em,
      picture:pc,
      licence:lic,
      spec:spec,
      room:room
    }
    return this.http.post('http://localhost:4000/manager/register',data)
  }
  delete(username){
    return this.http.post('http://localhost:4000/manager/delete',{username})
  }

  gerReq(){
    return this.http.get('http://localhost:4000/manager/req')
  }

  accept(un,pw,nm,ln,ph,ml,adr,pic,date,code,id){

    const data={
      username:un,
      password:pw,
      name:nm,
      lastname:ln,
      phone:ph,
      mail:ml,
      address:adr,
      picture:pic,
      date:date,
      code:code,
      id:id
    }
    return this.http.post('http://localhost:4000/manager/accept',data)

  }
  decline(un,ml,id){
    const data = {
      username:un,
      mail:ml,
      id:id
    }
    return this.http.post('http://localhost:4000/manager/decline',data)
  }

  branchRequest(){
    return this.http.get('http://localhost:4000/manager/branch')
  }

  branchAccept(name,duration,price,spec,id){
    const data={
      name:name,
      duration:duration,
      price:price,
      spec:spec,
      id:id
    }
    return this.http.post('http://localhost:4000/manager/acceptBranch',data)
  }

  branchDecline(id){
    return this.http.post('http://localhost:4000/manager/declineBranch',{id})
  }

  branchList(name){
    return this.http.post('http://localhost:4000/manager/branchList',{name})
  }

  specAdd(name){
    const data={name:name}
    return this.http.post('http://localhost:4000/manager/specAdd',data)
  }
  branchAdd(name,duration,price,spec){

    const data={
      name:name,
      duration:duration,
      price:price,
      spec:spec
    }
    return this.http.post('http://localhost:4000/manager/branchAdd',data)
  }

  branchEdit(spec,branch,price,duration,date,send){
    const data={
      spec:spec,
      branch:branch,
      price:price,
      duration:duration,
      today:date,
      send:send
    }
    return this.http.post('http://localhost:4000/manager/branchEdit',data)
  }

  branchDelete(spec,branch){
    const data={spec:spec,branch:branch}
    return this.http.post('http://localhost:4000/manager/branchDelete',data)

  }

  action(action,today){
    const data = {action:action,today:today}
    return this.http.post('http://localhost:4000/manager/action',data)

  }

}
