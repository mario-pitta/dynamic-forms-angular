
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormularioDinamicoModule } from '../formulario-dinamico/formulario-dinamico-module';
import { WizardFormComponent } from "./wizard-form.component";

@NgModule({
    declarations: [WizardFormComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormularioDinamicoModule], 
    exports: [WizardFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WizardFormModule{}