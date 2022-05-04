import { Questao } from "../Models/Questao"

export class Util {

    static filterOptions(questao: Questao) {
        return questao.type.options.filter(o => o.property == 'option')
    }

    static getTextAreaPropery(questao: Questao) {
        return (questao.type.options.filter(o => o.property == 'textarea').length > 0) ? questao.type.options.filter(o => o.property == 'textarea')[0] : null
    }


    static getAcceptProperty(questao: Questao) {
        let accept = ""
        questao.type.options.map(o => {
            if (o.property == 'accept') {
                accept += o.value + ","
            }
        })

        accept = accept.substring(accept.length - 1, 1)
        if (accept.length == 0) {
            accept = "*"
        }
        return accept
    }

    static getMultipleProperty(questao: Questao) {
        return (questao.type.options.filter(o => o.property === 'multiple').length > 0) ? true : false
    }

    static getMask(questao: Questao) {
        return questao.type.options.filter(o => o.property === 'mask')[0]
    }

    static getMaxSizeProperty(questao: Questao) {
        return questao.type.options.filter(o => o.property === 'maxsize')[0]
    }

    static getFloat(questao: Questao) {
        return (questao.type.options.filter(o => o.property === 'float').length > 0) ? true : false
    }

    static getMinValue(questao: Questao) {
        return (questao.type.options.filter(o => o.property === 'min').length > 0) ? Number(questao.type.options.filter(o => o.property === 'min')[0].value) : null
    }

    static getMaxValue(questao: Questao) {
        return (questao.type.options.filter(o => o.property === 'max').length > 0) ? Number(questao.type.options.filter(o => o.property === 'max')[0].value) : null
    }
}