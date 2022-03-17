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
  questions : Questao[] = []
  form: FormGroup
  formulario: Formulario

  rgMask = '00.000.000-00'

  constructor(private fb : FormBuilder, private route: ActivatedRoute, private formService: FormulariosService, private questionService : QuestionService) { }

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    await this.getForm(this.id).then(() => {
      setTimeout(() => {
        this.gerarForm(this.formulario, this.questions)
      }, 1000)

    })
  }




  async getForm(id: number) {    
     this.formService.getFormById(id).subscribe((data: Formulario) => {
      this.formulario = data
      this.formulario.questions.forEach(async (q: any) => {
        await this.questionService.getQuestionById(q.id).subscribe(async (questao: Questao) => {
          this.questions.push(questao);
          
        });
      })
      
    })
  }

  gerarForm(data: any, questions : Questao[]){  
    let group : any = {}
    questions.forEach(quest => {
      console.log(quest.key)
      group[quest.key] = new FormControl('', [(quest.required) ? Validators.required : Validators.nullValidator])
    })

    this.form =  new FormGroup(group)
    console.log(this.formulario)
    console.log(questions)
    console.log(this.form)
  }



  public get f () {
    return this.form
  }
}
