import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Formulario } from 'src/app/core/Models/Formulario';
import { Questao } from 'src/app/core/Models/Questao';
import { FormulariosService } from 'src/app/services/formularios/formularios.service';
import { QuestionService } from 'src/app/services/questions/question.service';

@Component({
  selector: 'app-formulario-dinamico',
  templateUrl: './formulario-dinamico.component.html',
  styleUrls: ['./formulario-dinamico.component.scss']
})
export class FormularioDinamicoComponent implements OnInit {
  id: number
  questions: Questao[] = []
  form: FormGroup
  formulario: Formulario

  rgMask = '00.000.000-00'

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private formService: FormulariosService, private questionService: QuestionService) { }

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
  }
  
  
  ngAfterViewInit() {    
    this.getFormulario(this.id).then(() => {
      setTimeout(() => {
        this.gerarFormGroup(this.formulario, this.questions)
      }, 1000)  
    })
  }



  async getFormulario(id: number) {
    this.formService.getFormById(id).subscribe((data: Formulario) => {
      this.formulario = data
      this.formulario.questions.forEach(async (q: any) => {
        await this.questionService.getQuestionById(q.id).subscribe(async (questao: Questao) => {
          questao.required = q.required
          this.questions.push(questao);

        });
      })

    })
  }

  gerarFormGroup(data: any, questions: Questao[]) {
    let group: any = {}
    questions.forEach(quest => {
      console.log(quest.name)
      group[quest.name] = new FormControl(
        (quest.type.key == 'select') ? '-1' : (quest.type.key == 'number') ? 0 : '',
        [
          //Acrescentar validadores conforme as opções das questões
          (quest.required) ? Validators.required : Validators.nullValidator,
          (quest.type.key == 'email') ? Validators.email : Validators.nullValidator
        ]
      )
    })

    this.form = new FormGroup(group)
    console.log(this.formulario)
    console.log(questions)
    console.log(this.form)
  }




  filterOptions(questao: Questao) {
    console.log(questao)
    let options = questao.type.options
    let filtrados = options.filter(o => o.property == 'option')

    return filtrados
  }


  getAcceptProperty(questao: Questao) {
    let accept = ""
    questao.type.options.map(o => { if (o.property == 'accept') { 
      accept += o.value + ","
    } })

    accept = accept.substring(accept.length - 1, 1)
    if(accept.length == 0){
      accept = "*"
    }
    return accept
  }



  getMultipleProperty(questao: Questao) { 
   let filtrado = questao.type.options.filter(o => o.property === 'multiple')
   console.log(filtrado)
  }


  getMaxSizeProperty(questao: Questao) { }

  salvarForm() {
    console.log(this.f.value)
  }
  public get f() {
    return this.form
  }
}
