import { Component, OnInit } from '@angular/core';
import { Questao } from 'src/app/core/Models/Questao';
import { ModalService } from 'src/app/services/modal-service/modal-service.service';
import { QuestionService } from 'src/app/services/questions/question.service';
import Swal, { SweetAlertResult } from 'sweetalert2'

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  inputText: any
  questoes: Questao[]

  constructor(private questionsService: QuestionService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  openQuestionFormModal(questao?: any) {
    this.modalService.openQuestionFormModal(questao).subscribe((data: any) => {
      this.getQuestions()
    })
  }

  searchData: any[]
  getQuestions() {
    this.questionsService.getQuestions().subscribe((data: any[]) => {
      this.questoes = data
      this.searchData = this.questoes
    })
  }

  deleteQuestion(questao: any) {
    Swal.fire({
      title: "Confirma?",
      text: "Tem certeza que deseja deletar esse item?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      icon: "warning"
    }).then((res: SweetAlertResult) => {
      if (res.value) {
        this.questionsService.delete(questao).subscribe(() => {
          Swal.fire('Excluído', 'Questão excluída com sucesso', 'success');
          this.getQuestions()
        })
      }

    })
  }


  search() {
    this.searchData = this.questoes.filter(q => q.name.trim().toLowerCase().indexOf(this.inputText.trim().toLowerCase()) > -1)

  }


}
