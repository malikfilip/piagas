import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  update(un, nm, ln, ph, ad, pic,sp,lc,mail) {
    const data = {
      username: un,
      name: nm,
      lastname: ln,
      phone: ph,
      address: ad,
      picture: pic,
      spec:sp,
      licence:lc,
      mail:mail
    }
    return this.http.post('http://localhost:4000/doctor/update', data)
  }

  getSpec (spec){
    return this.http.post('http://localhost:4000/doctor/spec', {spec})
  }
  getActive (doctor){
    return this.http.post('http://localhost:4000/doctor/active', {doctor})
  }

  addService(doc,mes){
    const data={
      doctor:doc,
      type:mes.name,
      duration:mes.duration,
      price:mes.price
    }
    return this.http.post('http://localhost:4000/doctor/addService', data)

  }
  removeService(doc,mes){
    const data={
      doctor:doc,
      type:mes.name
    }
    return this.http.post('http://localhost:4000/doctor/removeService', data)

  }

  getAppointments(doctor,today){
    
    const data = {doctor:doctor, today:today}
    return (this.http.post('http://localhost:4000/doctor/appointments', data))
  }
  cancel(patient,doctor){
    const data={
      patient:patient,
      doctor:doctor
    }
    return (this.http.post('http://localhost:4000/doctor/cancel', data))
  }

  getDoc(doctor){
    return (this.http.post('http://localhost:4000/doctor/doctor', {doctor}))
  }

  getFinished(user,doctor,today){
    const data={
      patient:user,
      doctor:doctor,
      today:today
    }
    return this.http.post('http://localhost:4000/doctor/finished', data)
  }

  addReport (pt,doc,dt,spec,type,dia,the,con,id){
    const data = {
      patient:pt,
      doctor:doc,
      date:dt,
      spec:spec,
      type:type,
      diagnosis:dia,
      therapy:the,
      control:con,
      id:id
    }
    return this.http.post('http://localhost:4000/doctor/report', data)
  }

  addBranch(doc,name,spec,dur,pri){
    const data={
      doctor:doc,
      name:name,
      spec:spec,
      duration:dur,
      price:pri
    }
    return this.http.post('http://localhost:4000/doctor/branch', data)
  }

  addFreeDay(doc,start,end){
    const data={
      doctor:doc,
      start:start,
      end:end
    }
    return this.http.post('http://localhost:4000/doctor/break', data)
  }

}
