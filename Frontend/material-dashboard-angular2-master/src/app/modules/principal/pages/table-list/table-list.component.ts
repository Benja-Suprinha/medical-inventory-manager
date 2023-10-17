import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})


export class TableListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: User[] = [
    {
      "id": 1,
      "name": "Juan Pérez"
    },
    {
      "id": 2,
      "name": "María López"
    },
    {
      "id": 3,
      "name": "Pedro Sánchez"
    },
    {
      "id": 4,
      "name": "Ana García"
    },
    {
      "id": 5,
      "name": "Luis Fernández"
    },
    {
      "id": 6,
      "name": "Marta Gómez"
    },
    {
      "id": 7,
      "name": "David Rodríguez"
    },
    {
      "id": 8,
      "name": "Carmen González"
    },
    {
      "id": 9,
      "name": "José Hernández"
    },
    {
      "id": 10,
      "name": "Isabel Martín"
    }
  ]
  constructor() { }

  ngOnInit() {
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

  deleteUser(id: number){
    console.log(id)
    return true
  }
}
interface User{
  id: number,
  name: string
}