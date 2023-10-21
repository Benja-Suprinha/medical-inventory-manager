import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'app/shared/services/admin.service';
import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})


export class TableListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users: any[] = []
  waiting: boolean = true
  closeResult = '';

  constructor(
    private adminService:AdminService,
    public modal: NgbModal,
    private fb: FormBuilder,
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

  public myForm!: FormGroup
  editUser(contenido,user:any){
    console.log(contenido)
    console.log(user)
    this.myForm = this.fb.group({
      username:[user.username],
      mail:[user.mail],
      password:[user.password],
      name:[user.name],
      type_user:[user.type_user],
      phone:[user.telefono]
    })
    this.modal.open(
      contenido,{
        backdrop:false
      }
    )
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

  submitFormulary(){
    console.log('Usuario editado con exito')
  }

}
interface User{
  id: number,
  name: string,
  username: string
}