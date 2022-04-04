export interface Questao {
    id?: number;
    key: string;
    show?: boolean;
    required: boolean;
    panelGroup?: string;
    type: {
        key: string | 'text' | 'email' | 'password' | 'number' | 'select' | 'document';
        option?: {
            key: null | string  // EX: 'mask' 
            value: string | boolean | number // EX: 'TELEFONE'| "CPF"| "EMAIL" | "CNPJ"
            tipo: string
        }[]
    }
}


//MULTIPLA ESCOLHA
var questao1 = {
    id: 1,
    key: "MULTIPLA ESCOLHA",
    required: true,
    panelGroup: "USUARIO",
    type: {
        key: 'select',
        options: [{
            descricao: "opcao 1",
            value: "1",
            property: "option"
        },
        {
            descricao: "opcao 2",
            value: "2",
            property: "option"
        },
        {
            descricao: "opcao 3",
            value: "3",
            property: "option"
        },
        {
            descricao: "",
            value: "true",
            property: "multiple"
        }]
    }
}

//NUMBER
var questao2 = {
    id: 2,
    key: "Number",
    required: true,
    type: {
        key: "number",
        options: [{
            descricao: "",
            value: "1000",
            property: "max"
        }, {
            descricao: "",
            value: "1",
            property: "min"
        }, {
            descricao: "",
            value: "MOEDA",
            property: "mask"
        }]
    }
}

//File
var questao3 = {
    id: 3,
    key: "Arquivo",
    required: true,
    type: {
        key: "file",
        options: [
            {
                property: "accept",
                value: ".pdf, .doc, .docx",
                descricao: "Documento"
            }, {
                property: "accept",
                value: ".csv, .csvx, .xls, .xlsx, .odf",
                descricao: "Planilha"
            }, {
                property: "accept",
                value: ".png, .jpeg, .jpg",
                descricao: "Imagem"
            },{
                property: "accept",
                value: ".mp4, .mov, .aac",
                descricao: "Video"
            },{
                property: "accept",
                value: ".mp3,.wav, .aac",
                descricao: "Audio"
            }, {
                property: "maxsize",
                value: "5mb",
                descricao: "Tam. Maximo do Arquivo."
            }, {
                property: "multiple",
                value: "true",
                descricao: "Multiplos Arquivos de uma só vez."
            }]
    }
}

//TELEFONE
var questao4 = {
    id: 4,
    key: "TELEFONE",
    required: true,
    type: {
        key: 'text',
        options: [{
            property: "mask",
            value: '"+00 | +000 " + " (00) 0 0000-0000 | (00) 0000-0000"',
            descricao: "TELEFONE",
        }, {
            property: "maxLenght",
            value: "500",
            descricao: "Tamanho maximo"
        }, 
        {
            property: "minLenght",
            value: "10",
            descricao: "Tamanho minimo"
        }, {
            property: "link",
            value: "http://......",
            descricao: "Link"
        }]

    }
}


//DOCUMENTO
var questao5 = {
    id: 5,
    key: "DOCUMENTO | CPF | RG | CNPJ | CNH | CERT. NASCIMENTO | ETC........",
    required: true,
    type: {
        key: 'text',
        options: [{
            property: "mask",
            value: '000.000.000-00 | 00.000.000-00 .....',
            descricao: "CPF | RG | CNPJ | CNH | CERT. NASCIMENTO | ETC........",
        }]
    }
}


var questao6 = {

}






/** FLUXO DE PROCESSO */
let processo = {
    id: 1,
    fluxo: {
        id: 40,
        estagio: 1,
        ordem: 1,
        descricao: "abs",
        centroDeInformacao: "SEDUR",
        subestagios: [{
            estagio: 1,
            descricao: "abs",
            parent_estagio_id: 40,
            ordem: 1,
            centroDeInformacao: "SEDUR/CAT"
        }, 
        {
            estagio: 1,
            ordem: 2,
            descricao: "abs",
            parent_estagio_id: 40,
            centroDeInformacao: "SEDUR/PQP"
        },
        {
            estagio: 1,
            ordem: 3,
            descricao: "abs",
            parent_estagio_id: 40,
            centroDeInformacao: "SEDUR/ABC"
        }]
    }
}


// SELECT *, 
// (SELECT * FROM PROCESSO_FLUXO_ESTAGIO F 
//      INNER JOIN ESTAGIO E ON E.ID = F.ESTAGIO_ID 
//     WHERE F.ID = F.PARENT_ESTAGIO_FLUXO_ID AND F.FL_SUBESTAGIO > 0) 
// FROM PROCESSO P 
//     INNER JOIN PROCESSO_FLUXO_ESTAGIO F ON F.PROCESSO_ID = P.ID
//     INNER JOIN ESTAGIO E ON E.ID = F.ESTAGIO_ID
// WHERE P.ID = 1 AND F.FL_SUBESTAGIO <> 1