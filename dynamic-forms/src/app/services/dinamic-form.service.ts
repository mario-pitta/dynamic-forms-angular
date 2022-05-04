import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DinamicFormService {
    action: string = ""
    actionSubject: BehaviorSubject<string> = new BehaviorSubject(this.action)
    form: FormGroup
    formSubject: BehaviorSubject<string> = new BehaviorSubject(this.action)

    public get getAction() {
        return this.actionSubject.value
    }

    public setAction(value: string) {
        this.actionSubject.next(value)
    }

    public get getForm() {
        return this.formSubject.value
    }

    public setForm(value: string) {
        this.formSubject.next(value)
    }



}
