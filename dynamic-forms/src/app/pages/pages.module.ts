import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListFormComponent } from "./list-form/list-form.component";

import { PagesRoutingModule } from "./pages-routing.module";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { FormularioDinamicoComponent } from './formulario-dinamico/formulario-dinamico.component';


@NgModule({
    declarations: [QuestionsListComponent, ListFormComponent, FormularioDinamicoComponent],
    imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [HttpClient]
})
export class PagesModule {}