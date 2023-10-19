import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  Users(): any{
    return this.http.get('http://localhost:3000/admin/read').pipe(
      map((data:data)=>{
        return data.data
      })
    )
  }

  addUser(username: string, pass: string, name: string, mail: string, type_user:string, phone: string, id_admin:number){
    return this.http.post('http://localhost:3000/admin/create/',{
      id_admin:id_admin,
      type_user:type_user,
      username:username,
      password:pass,
      name:name,
      mail:mail,
      telefono:phone
    }).pipe(
      map((res:any)=>{
        return res
      })
    )
  }

  deleteUser(idUser:number){
    return this.http.post('http://localhost:3000/admin/delete/',{
      id_user:idUser
    }).pipe(
      map((res:any)=>{
        return res
      })
    )
  }

}
interface data{
  status: string,
  code: number,
  data: any[]
}