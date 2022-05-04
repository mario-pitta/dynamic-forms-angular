import { OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accordion-form',
  templateUrl: './accordion-form.component.html',
  styleUrls: ['./accordion-form.component.scss']
})
export class AccordionFormComponent implements OnInit, OnChanges {
  action: string
  form_id: number
  questions: any[] = []
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form_id = Number(this.route.snapshot.params['id'])
    console.log(this.form_id)
  }

  ngOnChanges() { console.log('change') }

  changeListener(e: any) {
    console.log("change", e)
  }
}
