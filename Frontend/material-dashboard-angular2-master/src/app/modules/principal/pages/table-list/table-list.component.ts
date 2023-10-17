import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {

  users = [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jane Doe'
    }
  ];
  dataSource = this.users
  displayColumns: string[]=['id', 'name']
  constructor() { }

  ngOnInit() {
  }

  editUser(id: number){
    return true
  }

  deleteUser(id: number){
    return true
  }
}
