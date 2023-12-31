import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient,
    private logs: AuthService
  ) { }

  Products():any{
    return this.http.get('http://localhost:3000/inventario/read').pipe(
      map((data:data)=>{
        return data.data
      })
    )
  }
  
  addProduct(nameProduct:string,description:string,cantidad:number,price:number){
    return this.http.post('http://localhost:3000/inventario/create',{
      username:this.logs.Username,
      name_product:nameProduct,
      descripcion:description,
      cantidad:cantidad,
      precio:price
    }).pipe(
      map((res:any)=>{
        return res
      })
    )
  }

  editProduct(id: string, nameProduct: string, description: string, cantidad: number, price: number){
    return this.http.post('http://localhost:3000/inventario/update',{
      id_item:id,
      username: this.logs.Username,
      name_product:nameProduct,
      descripcion:description,
      cantidad:cantidad,
      precio:price
    }).pipe(
      map((res:any)=>{
        return res
      })
    )
  }

  replenishProduct(id: string, cantidad: number){
    return this.http.post('http://localhost:3000/inventario/replenish',{
      id_item:id,
      username:this.logs.Username,
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