import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient
  ) { }

  Products():any{
    return this.http.get('http://localhost:3000/inventario/read').pipe(
      map((data:data)=>{
        return data.data
      })
    )
  }
}
interface data{
  status: string,
  code: number,
  data: any[]
}