import { ElementRef, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Formulario } from 'src/app/core/Models/Formulario';
import { Questao } from 'src/app/core/Models/Questao';
import { Util } from 'src/app/core/Util/Util';
import { DinamicFormService } from 'src/app/services/dinamic-form.service';
import { FormulariosService } from 'src/app/services/formularios/formularios.service';
import { QuestionService } from 'src/app/services/questions/question.service';


@Component({
  selector: 'app-formulario-dinamico',
  templateUrl: './formulario-dinamico.component.html',
  styleUrls: ['./formulario-dinamico.component.scss']
})
export class FormularioDinamicoComponent implements OnInit {

  @Input() action: string = 'R'
  @Input() showOnly: string
  @Input() viewMode: "wizard" | "accordion"
  @Input() questions: Questao[] = []
  id: number
  form: FormGroup
  formulario: Formulario
  changeEmitter: EventEmitter<any> = new EventEmitter();
  changeSubject: Subject<any> = new Subject();
  rgMask = '00.000.000-00'
  @Input() form_id: number
  subs: Subscription[] = []
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private formService: FormulariosService, private questionService: QuestionService, private actionService: DinamicFormService) { }

  async ngOnInit() {
    this.id = this.form_id
    console.log("load formdinamico: id = ", this.form_id)

  }

  ngAfterViewInit() {
    this.getFormulario(this.id).then(() => {
      setTimeout(() => {
        this.gerarFormGroup(this.formulario, this.questions)
        this.actionService.actionSubject.asObservable().subscribe(action => {
          this.action = action
          this.disableFormControls(this.action)

        })
      }, 1500)
    })

  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges: ', changes);

    this.disableFormControls(this.action)
  }



  panelArray: any[] = []
  buildPanelArray(questions: Questao[]) {
    if (this.questions.length == this.formulario.questions.length) {
      questions.map(q => {
        if (this.panelArray.indexOf(q.panelGroup) < 0)
          this.panelArray.push(q.panelGroup)
        // console.log(this.panelArray)

      })
      this.buildPanelAnalise()
    }
  }

  analistaQuestions: Questao[] = []
  vistoriadorQuestions: Questao[] = []
  fiscalQuestions: Questao[] = []
  servidorPanel: any[] = []

  /** METDO RESPONSAVEL POR CRIAR PANEL ESPECIFICOS PARA QUESTOES DE ANALISTA, VISTORIADOR E FISCAL */
  buildPanelAnalise() {
    // this.panelArray.push("Analista", "Fiscal", "Vistoriador")
    this.questions.sort((a, b) => a.id - b.id)
    this.questions.map(q => {
      if (!q.show) {
        if (q.vistoria.show) this.vistoriadorQuestions.push(q)
        if (q.analise.show) this.analistaQuestions.push(q)
        if (q.fiscalizacao.show) this.fiscalQuestions.push(q)
      }

    })


    // this.servidorPanel.push(this.vistoriadorQuestions,this.analistaQuestions, this.fiscalQuestions)
    // console.log(this.servidorPanel)

  }

  async getFormulario(id: number) {
    this.formService.getFormById(id).subscribe((data: Formulario) => {
      this.formulario = data
      this.formulario.questions.forEach(async (q: any) => {
        await this.questionService.getQuestionById(q.id).subscribe(async (questao: Questao) => {
          questao.required = q.required
          questao.analise = q.analise
          questao.fiscalizacao = q.fiscalizacao
          questao.vistoria = q.vistoria
          this.questions.push(questao);
          this.buildPanelArray(this.questions)
        });
      })
    })
  }

  emailRegex = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$')
  changeFile(event: any, questao: Questao) {
    const file: File = event.target.files[0]
    const fileExtension: string = file.name.split('.')[file.name.split('.').length - 1].toLowerCase()
    const fileReader: FileReader = new FileReader();
    const formFileControl: FormControl = this.f.get(event.target.id) as FormControl
    const valid = async () => {
      console.log("validanddo extensaõ do arquivo")
      if (pattern > -1) {
        return true
      } else {
        return false
      }
    }


    const acceptedExtensions = this.getAcceptProperty(questao)
    const pattern = acceptedExtensions.trim().indexOf(fileExtension)

    // function checkIfExtensionExists(username: string): Observable<boolean> {
    //   return of(pattern > -1).pipe(delay(1000));
    // }

    // function checkAcceptValidator(control: AbstractControl, acceptedExtensions: string):AsyncValidatorFn {
    //   return (control: AbstractControl): any => {
    //     checkIfExtensionExists(control.value).pipe(
    //       map((res: any) => {
    //         console.log(res)
    //         return valid ? of({ accepted_extension: false } as ValidationErrors) : of({ accepted_extension: true } as ValidationErrors)
    //         // NB: Return null if there is no error
    //       })
    //     );
    //   }
    // }

    fileReader.onload = (e: any) => {
      console.log(e.target.result)
      // console.log(formFileControl)
      // formFileControl.setAsyncValidators(checkAcceptValidator(formFileControl, acceptedExtensions))

      // formFileControl.setValue(e.target.result)
    }

    formFileControl.updateValueAndValidity()
    if (pattern > -1) {
      fileReader.readAsDataURL(file)
    } else {
      let error = {
        error: "Invalid Format"
      }
      formFileControl.markAsTouched()
      this.changeEmitter.emit(error)
      this.changeSubject.next(error)
      formFileControl.reset()
    }

  }

  gerarFormGroup(data: any, questions: Questao[]) {
    let group: any = {}
    questions.forEach((quest: Questao | any) => {
      var options: any[] = []
      var optArr: FormGroup[] = []
      if (quest.type.options) {
        options = quest.type.options.filter((o: Questao["type"]["options"] | any) => o.property == 'option')
        if (options.length > 0) {
          options.map(o => {
            if (o.descricao == "") {
              o.descricao = o.value
              o.value = false
            }
            // if (quest.type.options.filter((o: Questao["type"]["options"] | any) => o.property == 'multiple').length > 0) {
            //   // group = this.fb.group({
            //   //   value: o.value,
            //   //   descricao: o.descricao,
            //   //   property: o.property
            //   // })
            //   // optArr.push(group)
            // }
          })

          quest.formOptions = optArr

          //Acrescentar validadores conforme as opções das questões
          var validators: any[] = []
          if (quest.required) { validators.push(Validators.required) }
          if (quest.type.key == 'email') { validators.push(Validators.email) }
          if (quest.type.key == 'email') { validators.push(Validators.pattern(this.emailRegex)) }
          if (quest.type.key == 'number') {
            if (this.getMinValue(quest) !== null) {
              validators.push(Validators.min(this.getMinValue(quest)))
            }
            if (this.getMaxValue(quest) !== null) {
              validators.push(Validators.max(this.getMaxValue(quest)))
            }
          }
          console.log(quest.formOptions)
        }
      }

      group[quest.name] = new FormControl(
        (quest.type.key == 'select') ?
          optArr
          : (quest.type.key == 'number' && this.getMinValue(quest)) ? this.getMinValue(quest) :
            (quest.type.key == 'number' && this.getMinValue(quest) != null) ? this.getMinValue(quest) : '',
        validators
      )
    })
    this.form = new FormGroup(group)
  }

  buildOptionForm(quest: any) {
    return this.fb.group({
      [quest.value]: [false]
    })
  }

  getQuestionOptions(question: any) {
    console.log('questao: ', question)
    console.log(this.form.get(question.name).value.controls)
    return question.formOptions as FormArray

  }

  disableFormControls(action: string) {
    if (action != 'R') {
      this.showOnly = action
      for (let i = 0; i < Number(this.questions.length); i++) {
        this.form.controls[this.questions[i].name].disable()
      }
    }
  }

  filterOptions(questao: Questao) {
    return Util.filterOptions(questao)
  }


  getAcceptProperty(questao: Questao) {
    return Util.getAcceptProperty(questao)
  }

  getTextAreaPropery(questao: Questao) {
    let retorno = Util.getTextAreaPropery(questao)
    return retorno
  }

  getMultipleProperty(questao: Questao) {
    return Util.getMultipleProperty(questao)
  }

  getMask(questao: Questao) {
    return Util.getMask(questao)
  }

  getMaxSizeProperty(questao: Questao) {
    return Util.getMaxSizeProperty(questao)
  }

  getFloat(questao: Questao) {
    return Util.getFloat(questao)
  }

  getMinValue(questao: Questao) {
    return Util.getMinValue(questao)
  }

  getMaxValue(questao: Questao) {
    return Util.getMaxValue(questao)
  }

  salvarForm() {
    console.log(this.f.value)
  }
  public get f() {
    return this.form
  }


  capitalize(event: any): string {
    let capitalize: string = event.toUpperCase()
    return capitalize
  }


  emitChange(questao: Questao) {
    let change = { event: "change", form: this.f, field: questao.name }
    this.changeEmitter.emit(change)
    this.changeSubject.next(change)
    console.log(change)
  }

  questao: Questao = null
  @ViewChildren("checkboxes") checkboxes: QueryList<any>
  @ViewChildren("checkQuest") checkQuest: QueryList<any>
  getSelectedOptions(event: any, questao: Questao, checkQuest: HTMLInputElement) {
    let checkList: any[] = []
    this.checkQuest.toArray().forEach(a => {
      let questaoCheckName = a.nativeElement.id.split("_")[1].toString()
      if (questao.name == questaoCheckName) {
        checkList.push(a)
      }
    })

    let selected: string[] = []
    checkList.forEach(c => {
      let descOption = c.nativeElement.id.split("_").splice(-1).toString()
      if (c.nativeElement.checked) {
        selected.push(descOption)
      }
    })

    console.log("selected: ", selected)

    console.log('get ckechbox change')
    this.form.get(questao.name).setValue(selected)


  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

}
