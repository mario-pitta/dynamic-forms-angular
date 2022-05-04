import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListFormComponent } from "./list-form/list-form.component";

import { PagesRoutingModule } from "./pages-routing.module";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { ExibeFormComponent } from './exibe-form/exibe-form.component';
import { AccordionFormModule } from './accordion-form/accordion-form.module';
import { WizardFormModule } from './wizard-form/wizard-form.module';


@NgModule({
    declarations: [QuestionsListComponent, ListFormComponent,ExibeFormComponent],
    imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule, NgxMaskModule, AccordionFormModule, WizardFormModule],
    providers: [HttpClient],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PagesModule {}