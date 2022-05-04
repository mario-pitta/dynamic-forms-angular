
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { ListFormComponent } from './list-form/list-form.component';
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { FormularioDinamicoComponent } from "./formulario-dinamico/formulario-dinamico.component";
import { ExibeFormComponent } from "./exibe-form/exibe-form.component";


const ROUTES: Routes = [
    {

        path: 'pages', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: QuestionsListComponent },
            { path: 'questionario', component: ListFormComponent },
            { path: 'exibe-form/:id', component: ExibeFormComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }