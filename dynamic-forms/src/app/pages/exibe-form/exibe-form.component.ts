import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DinamicFormService } from 'src/app/services/dinamic-form.service';

@Component({
  selector: 'app-exibe-form',
  templateUrl: './exibe-form.component.html',
  styleUrls: ['./exibe-form.component.scss']
})
export class ExibeFormComponent implements OnInit {
  action: string = "R"
  form_id: number
  questions: any[] = []
  constructor(private route: ActivatedRoute, private actionService: DinamicFormService) { }

  ngOnInit(): void {
    this.form_id = Number(this.route.snapshot.params['id'])
    console.log(this.form_id)
    this.changeAction()
  }

  changeAction(){
    this.actionService.setAction(this.action)
  }

  changeListener(e: any){
    console.log("change", e)
  }

}
