import { FormArray } from "@angular/forms";

export interface Questao {
    id?: number
    name: string,
    show?: boolean,
    required: boolean
    type: {
        key: string | 'texto' | 'email' | 'password' | 'numero' | 'select' | 'document';
        options?: {
            value: string | boolean | number // EX: 'TELEFONE'| "CPF"| "EMAIL" | "CNPJ"
            property: string,
            descricao: string
        }[]
    }
    panelGroup?: string;
    detalhamento?: string;
    vistoria?: {show: boolean};
    analise?: {show: boolean};
    fiscalizacao?: {show: boolean};
    formOptions?: FormArray;
}