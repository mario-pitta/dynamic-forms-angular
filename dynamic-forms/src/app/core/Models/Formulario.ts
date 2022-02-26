import { Cidade } from "./Cidade";
import { Questao } from "./Questao";

export interface Formulario {
    id: number;
    descricao: string;
    cidade: Cidade;
    questions: Questao[];
}