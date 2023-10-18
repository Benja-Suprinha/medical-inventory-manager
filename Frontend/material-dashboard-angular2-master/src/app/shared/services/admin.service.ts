import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  Users(): any{
    this.http.get('http://190.209.25.193:3000/admin/read').subscribe((data:data)=>{
      console.log(data.data)
      return data.data
    })
  }
}
interface data{
  status: string,
  code: number,
  data: any[]
}