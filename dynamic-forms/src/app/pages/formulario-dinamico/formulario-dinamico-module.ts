import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormularioDinamicoComponent } from "./formulario-dinamico.component";

@NgModule({
    declarations: [FormularioDinamicoComponent],
    imports:[FormsModule, ReactiveFormsModule, CommonModule, NgxMaskModule],
    exports:[FormularioDinamicoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioDinamicoModule{}