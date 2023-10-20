import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/shared/services/admin.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})


export class TableListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: any[] = []
  waiting: boolean = true

  constructor(
    private adminService:AdminService,
  ) { }

  ngOnInit() {
    this.initTable()
  }

  async initTable(){
    const data: any = await this.adminService.Users().toPromise()
    this.waiting = false
    this.users = data
    console.log(this.users)
    this.dtOptions = {
      language: {
        "search":"",
        "searchPlaceholder":"Filtrar...",
        "zeroRecords": "No se encuentran registros",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "lengthMenu": "Mostrando _MENU_ registros",
        "paginate":{
          "first": "",
          "last": "",
          "previous": "Anterior",
          "next": "Siguiente"
        },
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "infoFiltered":   "(filtrado de _MAX_ registros totales)"
      }
    };
  }

  editUser(id: number){
    console.log(id)
    return true
  }

  async deleteUser(id: number){
    if(confirm("Seguro que quieres borrar este usuario?")){
      const res = await this.adminService.deleteUser(id).toPromise()
      console.log(res)
      if(res && res.status){
        this.users = this.users.filter(item => item.id !== id)
      }else{
        alert('Ocurrio un error al eliminar al usuario, intente nuevamente')
      }

      console.log(this.users)
    }
    return true
  }
}
interface User{
  id: number,
  name: string,
  username: string
}