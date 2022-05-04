import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-form',
  templateUrl: './wizard-form.component.html',
  styleUrls: ['./wizard-form.component.scss']
})
export class WizardFormComponent implements OnInit {
  action: string
  form_id: number
  questions: any[] = []
  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.form_id = Number(this.route.snapshot.params['id'])
    console.log(this.form_id)
  }

  changeListener(e: any){
    console.log("chage", e)
  }
}
