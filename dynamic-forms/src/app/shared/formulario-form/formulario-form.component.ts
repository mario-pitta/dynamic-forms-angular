import { Subject } from 'rxjs';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from 'src/app/core/Models/Formulario';
import { Questao } from 'src/app/core/Models/Questao';
import { QuestionService } from 'src/app/services/questions/question.service';
import { FormulariosService } from 'src/app/services/formularios/formularios.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-formulario-form',
  templateUrl: './formulario-form.component.html',
  styleUrls: ['./formulario-form.component.scss'],
})
export class FormularioFormComponent implements OnInit {
  form: FormGroup;
  formulario: Formulario;
  questions: Questao[] | any[] = [];
  resposta: Subject<any> = new Subject();
  @ViewChildren('checkShowQuestion') checkShowQuestion: QueryList<any>;
  @ViewChildren('checkRequiredQuestion') checkRequiredQuestion: QueryList<any>;
  @ViewChildren('checkFiscalizacaoQuestion')
  checkFiscalizacaoQuestion: QueryList<any>;
  @ViewChildren('checkVistoriaQuestion') checkVistoriaQuestion: QueryList<any>;
  @ViewChildren('checkAnaliseQuestion') checkAnaliseQuestion: QueryList<any>;
  @ViewChildren('checkRequerimentoQuestion')
  checkRequerimentoQuestion: QueryList<any>;
  constructor(
    public modal: BsModalRef,
    private fb: FormBuilder,
    private questionsService: QuestionService,
    private formService: FormulariosService
  ) {}

  ngOnInit() {
    this.getQuestions();

    this.form = this.fb.group({
      id: ['', [Validators.nullValidator]],
      descricao: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      questions: [[], [Validators.required]],
    });
  }

  getQuestions() {
    this.questionsService.getQuestions().subscribe((data: any[]) => {
      this.questions = data;

      if (this.questions.length > 0) {
        if (this.f.value.questions.length > 0) {
          this.questions.forEach((q) => {
            q.show = false;
            q.fiscalizacao = {
              show: false,
            };
            q.analise = {
              show: false,
            };
            q.vistoria = {
              show: false,
            };
          });
          this.completeQuestions();
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.formulario) {
      this.form.patchValue({
        id: this.formulario.id,
        descricao: this.formulario.descricao,
        cidade: this.formulario.cidade,
        questions: this.formulario.questions,
      });

      // console.log(this.f.value)
    }
  }

  checkQuestions() {
    let questions: { id: number; required: true }[] = [];
    this.checkShowQuestion.toArray().forEach((cQ) => {
      if (cQ.nativeElement.checked) {
        let requireCheck =
          this.checkRequiredQuestion.toArray()[
            this.checkShowQuestion.toArray().indexOf(cQ)
          ];
        questions.push({
          id: Number(cQ.nativeElement.id.split('_')[1]),
          required: requireCheck.nativeElement.checked,
        });
      }
    });

    this.form.patchValue({
      questions: questions,
    });

    this.getSelectedChecks();
  }

  getSelectedChecks() {
    let questions: {
      id: number;
      required: boolean;
      fiscalizacao: {
        show: boolean;
      };
      analise: {
        show: boolean;
      };
      vistoria: {
        show: boolean;
      };
      show: boolean;
    }[] = [];

    this.questions.forEach((q) => {
      let obj = {
        id: q.id,
        required: q.required,
        show: q.show || true,
        fiscalizacao: {
          show: q.fiscalizacao?.show || true,
        },
        analise: {
          show: q.analise?.show || true,
        },
        vistoria: {
          show: q.vistoria?.show || true,
        },
      };
      if (
        obj.analise?.show ||
        obj.fiscalizacao?.show ||
        obj.vistoria?.show ||
        obj?.show
      )
        q = {
          ...q,
          ...obj,
        };
      questions.push(q);
    });

    // this.questions = questions
    this.form.patchValue({ questions: questions });
  }

  completeQuestions() {
    this.f.value.questions.forEach((fQ: any) => {
      this.questions.forEach((q: Questao) => {
        q.show = fQ.show;
        q.fiscalizacao = {
          show: fQ.fiscalizacao.show,
        };
        q.analise = {
          show: fQ.analise.show,
        };
        q.vistoria = {
          show: fQ.vistoria.show,
        };
        // console.log(q)
        this.log(q);
        if (q.id == fQ.id) {
          q.show = true;
          q.show = fQ.show;
          q.fiscalizacao = {
            show: fQ.fiscalizacao.show,
          };
          q.analise = {
            show: fQ.analise.show,
          };
          q.vistoria = {
            show: fQ.vistoria.show,
          };
          if (fQ.required) {
            q.required = true;
          }
        }
      });
    });
  }

  log(value: any) {
    // console.log(value)
  }

  confirm() {
    if (this.formulario) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.formService.createForm(this.f.value).subscribe(
      (data: any) => {
        this.close(true);
        this.showSuccess();
      },
      (err) => {
        this.showError();
      }
    );
  }

  update() {
    this.formService.updateForm(this.f.value).subscribe(
      (data: any) => {
        this.close(true);
        this.showSuccess();
      },
      (err) => {
        this.showError();
      }
    );
  }

  showSuccess() {
    Swal.fire({
      icon: 'success',
      text: 'Deu tudo certo!!',
      timer: 2500,
    });
  }

  showError() {
    Swal.fire({
      icon: 'error',
      text: 'Algo deu errado tudo certo!!',
    });
  }

  showConfirm() {
    return Swal.fire({
      icon: 'warning',
      title: 'Confirma?',
      timer: 2500,
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      showCancelButton: true,
      cancelButtonText: 'Não',
    }).then((res: SweetAlertResult) => {
      return res;
    });
  }

  close(value: any) {
    this.resposta.next(value);
    this.modal.hide();
  }

  public get f() {
    return this.form;
  }
}
