import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private logs: AuthService
  ) { }

  Items():any{
    return this.http.get('http://localhost:3000/medico/read').pipe(
      map((data:data)=>{
        return data.data
      })
    )
  }

  withdrawItem(id: string, cantidad: number){
    return this.http.post('http://localhost:3000/medico/withdraw',{
      id_item:id,
      username: this.logs.Username,
      cantidad:cantidad
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