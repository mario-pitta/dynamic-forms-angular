import { AccordionFormComponent } from './accordion-form.component';
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormularioDinamicoModule } from '../formulario-dinamico/formulario-dinamico-module';

@NgModule({
    declarations: [AccordionFormComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormularioDinamicoModule], 
    exports: [AccordionFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccordionFormModule{}