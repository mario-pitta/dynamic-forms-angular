export interface Questao {
    id?: number
    key: string, 
    show?: boolean,
    type: { 
        key: string | 'texto' | 'email' | 'password' | 'numero' | 'select' | 'document'; 
        option?: {
            key: null | string 
            value: string | boolean | number 
        } []
    }
    mask?: null | 'TELEFONE'| "CPF"| "EMAIL" | "CNPJ"
    required: boolean
    controlType?: string
    panelGroup?: string
}