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
    return true
  }

}
interface data{
  status: string,
  code: number,
  data: any[]
}