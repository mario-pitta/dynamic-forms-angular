
import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/questions/question.service';
import Swal from 'sweetalert2'
import { Questao } from 'src/app/core/Models/Questao';
import { Util } from 'src/app/core/Util/Util';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit, AfterContentInit {
  resposta: Subject<any> = new Subject<any>();
  form: FormGroup
  @Input() questao: Questao
  @ViewChildren("checkFileOption") checkFileOption: QueryList<ElementRef>
  type: Questao["type"] = { key: "", options: [] }
  isFloat: boolean

  constructor(public modal: BsModalRef, private fb: FormBuilder, private questionsService: QuestionService) { }

  public get f() {
    return this.form
  }

  ngOnInit(): void {
    // this.type.key = "documento" 
    this.form = this.fb.group({
      id: [null, Validators.nullValidator],
      name: ['', Validators.required],
      required: [false, Validators.nullValidator],
      panelGroup: ['', Validators.required],
      detalhamento: [null, Validators.nullValidator],
      type: {
        key: ['-1', Validators.required],
        options: [[], Validators.required]
      }
    })
  }

  ngAfterContentInit(): void {
    if (this.questao) {
      console.log(this.questao);
      this.form.patchValue({
        id: this.questao.id,
        name: this.questao.name,
        type:
        {
          key: this.questao.type.key,
          options: this.questao.type.options
        },
        required: this.questao.required,
        panelGroup: this.questao.panelGroup,
        detalhamento: this.questao.detalhamento
      })

      this.type = this.questao.type

      if (this.type.key == 'text') {
        this.type.options.map(o => {
          if (o.descricao == 'CPF' || 'RG' || 'CNH' || 'CNPJ') {
            setTimeout(() => {
              this.selectTextOption.nativeElement.value = 'document';
              setTimeout(() => {
                this.textOption.nativeElement.value = o.descricao.toLowerCase()
              }, 80)
            }, 250)
          }
        })
      }
      if (this.type.key == 'select') {
        this.altOptions = this.type.options
      }
    }
  }

  setFormType() {
    if (this.f.value.type.key == 'select') {
      this.type.options = this.altOptions
    }
    this.form.patchValue({
      type: {
        key: this.type.key,
        options: this.type.options
      }
    })
  }

  confirm() {
    this.setFormType()
    console.log(this.f.value)
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


  clearSubtypes() {

  }

  /** Contruindo Opções de um input TEXT */
  @ViewChild('selectTextOption') selectTextOption: ElementRef
  @ViewChild('textOption') textOption: ElementRef
  buildTextOption() {
    this.type.options = []
    let obj
    const that = this
    switch (this.selectTextOption.nativeElement.value) {
      case 'document':
        buildTextDocumentOption()
        break;
      case 'link':
        buildTextLinkOption()
        break;
      case 'frase':
        buildTextFraseOption()
        break;
      case 'name':
        buildTextNameOption()
        break;
    }

    function buildTextLinkOption() {
      obj = {
        property: "href",
        value: "https://",
        descricao: "Link"
      }
    }

    function buildTextFraseOption() {
      obj = {
        property: "textarea",
        value: "true",
        descricao: "textarea"
      }
    }

    function buildTextNameOption() {
      obj = {
        property: "camel-case",
        value: "camel-case",
        descricao: "camel-case"
      }
    }


    function buildTextDocumentOption() {
      switch (that.textOption.nativeElement.value) {
        case "cpf":
          obj = {
            property: "mask",
            value: "000.000.000-00",
            descricao: "CPF"
          }
          break;
        case "rg":
          obj = {
            property: "mask",
            value: "00.000.000-00",
            descricao: "RG"
          }
          break;
        case "cnh":
          obj = {
            property: "mask",
            value: "0000000000000",
            descricao: "CNH"
          }
          break;
        case "cnpj":
          obj = {
            property: "mask",
            value: "00.000.000/0000-00",
            descricao: "CNPJ"
          }
          break;
      }
    }

    this.type.options.push(obj)
  }

  /** Contruindo Opções de um input FILE */
  buildFileOptions() {
    let arr = this.checkFileOption.toArray()
    this.type.options = []
    arr.forEach(a => {
      let obj
      if (a.nativeElement.checked) {
        switch (a.nativeElement.id) {
          case "documento":
            //.pdf, .doc, .docx
            obj = {
              property: "accept",
              value: ".pdf, .doc, .docx",
              descricao: "Documento"
            }
            break
          case "panilha":
            //.csv, .csvx, .xls, .xlsx, .odf
            obj = {
              property: "accept",
              value: ".csv, .csvx, .xls, .xlsx, .odf",
              descricao: "Planilha"
            }
            break
          case "imagem":
            //.png, .jpeg, .jpg
            obj = {
              property: "accept",
              value: ".png, .jpeg, .jpg",
              descricao: "Imagem"
            }
            break
          case "audio":
            //.mp3,.wav, .aac
            obj = {
              property: "accept",
              value: ".mp3,.wav, .aac",
              descricao: "Audio"
            }
            break
          case "video":
            //.mp4, .mov, .aac
            obj = {
              property: "accept",
              value: ".mp4, .mov, .aac",
              descricao: "Video"
            }
            break
        }
        this.type.options.push(obj)
        console.log(this.type.options)
      }
    })
  }


  /** Construindo opções de uma questão de multipla escolha */
  //#region 
  altOptions: Questao["type"]["options"] = [
    {
      value: "",
      property: "option",
      descricao: ""
    },
    {
      value: "",
      property: "option",
      descricao: ""
    },
    {
      value: "",
      property: "option",
      descricao: ""
    },
  ]
  addOption() {
    this.altOptions.push({
      value: "",
      property: "option",
      descricao: ""
    })
  }

  removeQuestion(id: any) {
    this.altOptions.splice(this.altOptions.indexOf(id), 1)
  }

  multipleChoices: any = { property: "multiple", value: false, descricao: "Multiplas escolhas" }
  toggleMultipleOptionsChoose(value: boolean) {
    this.multipleChoices.value = value
    this.altOptions = this.altOptions.filter(o => o.property != "multiple")
    this.altOptions.push(this.multipleChoices)
  }

  filterOptions() {
    return this.altOptions.filter(o => o.property == 'option')
  }
  //#endregion


  /** Contruindo opções para input number */
  buildNumberOptions() {

  }

  integerValue: any = { property: "float", value: false, descricao: "float" }
  toggleIntergerNumber(value: boolean) {
    console.log(value)
    this.isFloat = value
    this.type.options = this.type.options.filter(o => o.property !== "float")
    if (value) {
      this.integerValue.value = value
      this.type.options.push(this.integerValue)
    }
    console.log(this.type.options)
  }

  buildCoinMaskProperty(value: boolean) {
    console.log(value)
    let obj = { property: "mask", value: "", descricao: "isCoin" }
    this.type.options = this.type.options.filter(o => o.property !== "mask")
    this.type.options.push(obj)
  }

  buildMinOption(e: any) {
    console.log(e.target.value)
    this.type.options = this.type.options.filter(o => o.property !== "min")
    let obj = { property: "min", value: e.target.value, descricao: "min" }

    this.type.options.push(obj)
  }

  buildMaxOption(e: any) {
    console.log(e.target.value)
    this.type.options = this.type.options.filter(o => o.property !== "max")
    let obj = { property: "max", value: e.target.value, descricao: "max" }
    this.type.options.push(obj)

  }
}
