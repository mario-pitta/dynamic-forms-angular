import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Formulario } from 'src/app/core/Models/Formulario';
import { Questao } from 'src/app/core/Models/Questao';
import { FormularioFormComponent } from 'src/app/shared/formulario-form/formulario-form.component';
import { QuestionFormComponent } from 'src/app/shared/question-form/question-form.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: BsModalService) { }


  openQuestionFormModal(questao?: Questao) {
    let initialState = {
      questao: questao
    }
    const modalRef: BsModalRef = this.modal.show(QuestionFormComponent, { initialState })
    return modalRef.content.resposta.asObservable()

  }


  openFormularioModal(form?: Formulario) {
    let initialState = {
      formulario: form,
      config: {
        class: 'modal-lg'
      }
    }

    const modalRef = this.modal.show(FormularioFormComponent, { initialState } )
    modalRef.setClass('modal-lg')
    return modalRef.content.resposta.asObservable()
  }
}
