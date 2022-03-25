export interface Questao {
    id?: number
    key: string, 
    show?: boolean,
    required: boolean
    type: { 
        key: string | 'texto' | 'email' | 'password' | 'numero' | 'select' | 'document'; 
        option?: {
            key: null | string  // EX: 'mask' 
            value: string | boolean | number // EX: 'TELEFONE'| "CPF"| "EMAIL" | "CNPJ"
        } []
    }    
    panelGroup?: string
}