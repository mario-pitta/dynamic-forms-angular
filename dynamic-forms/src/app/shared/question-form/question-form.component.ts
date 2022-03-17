
import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/questions/question.service';
import Swal from 'sweetalert2'
import { Questao } from 'src/app/core/Models/Questao';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit, AfterContentInit {
  resposta: Subject<any> = new Subject<any>();
  form: FormGroup
  @Input() questao: Questao
  type: Questao["type"] = { key: "", option: null }

  constructor(public modal: BsModalRef, private fb: FormBuilder, private questionsService: QuestionService) { }

  public get f() {
    return this.form
  }

  ngOnInit(): void {
    // this.type.key = "documento" 
    this.form = this.fb.group({
      id: [null, Validators.nullValidator],
      key: ['', Validators.required],
      type: {
        key: ['', Validators.required],
        option: ['', Validators.nullValidator],
        values: ['', Validators.nullValidator]
      },
      required: [false, Validators.nullValidator],
      panelGroup: ['', Validators.required]
    })
  }

  ngAfterContentInit(): void {
    if (this.questao) {
      this.form.patchValue({
        id: this.questao.id,
        key: this.questao.key,
        type:
        {
          key: this.questao.type.key,
          option: this.questao.type.option
        },
        required: this.questao.required,
        panelGroup: this.questao.panelGroup
      })
      this.type = this.questao.type
    }
  }

  setFormType(value: any) {
    this.form.patchValue({
      type: {
        key: this.type.key,
        option: this.type.option
      }
    })
    console.log(value)
  }


  confirm() {
    if (this.questao) {
      this.updateQuestion()
    } else {
      this.createQuestion()
    }
  }

  createQuestion() {
    this.questionsService.create(this.f.value).subscribe((data) => {
      this.close(true)
      Swal.fire('', 'Questão adicionada com sucesso!', 'success')
    })
  }

  updateQuestion() {
    this.questionsService.update(this.f.value).subscribe((data) => {
      this.close(true)
      Swal.fire('', 'Questão atualizada com sucesso!', 'success')
    })
  }

  close(value: boolean) {
    this.resposta.next(true)
    this.modal.hide()
  }
}
