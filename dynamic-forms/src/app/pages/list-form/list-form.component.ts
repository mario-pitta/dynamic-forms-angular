import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formulario } from 'src/app/core/Models/Formulario';
import { FormulariosService } from 'src/app/services/formularios/formularios.service';
import { ModalService } from 'src/app/services/modal-service/modal-service.service';
import Swal, { SweetAlertResult } from 'sweetalert2'

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {
  inputText: string
  forms: Formulario[]
  searchData: Formulario[]


  constructor(private formularioService: FormulariosService, private modalService : ModalService, public router : Router) { }

  ngOnInit(): void {
    this.getForms()
  }

  getForms() {
    this.formularioService.getForms().subscribe((data: any[]) => {
      this.forms = data
      this.searchData = this.forms
    })
  }

  openFormModal(form?: Formulario) {
    this.modalService.openFormularioModal(form).subscribe(data => {
      this.getForms()
    })
  }

  deleteForm(form?: Formulario) {
    Swal.fire({
      title: "Tem certeza que deseja excluir esse formulario?",
      icon: 'warning'
    }).then((res: SweetAlertResult) => {
      if (res.value) {
        this.formularioService.deleteForm(form).subscribe(() => {
          Swal.fire({
            text: 'Excluido com sucesso.',
            timer: 3000,
            icon: 'success'
          })
          this.getForms()
        })
      }
    })
  }

  search() {
    console.log(this.inputText)
  }

}
