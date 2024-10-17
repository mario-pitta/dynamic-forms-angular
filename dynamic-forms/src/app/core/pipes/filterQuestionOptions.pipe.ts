import { Pipe, PipeTransform } from '@angular/core';
import { Questao } from '../Models/Questao';

@Pipe({
  name: 'filterQuestionOptions',
})
export class FilterQuestionOptionsPipe implements PipeTransform {
  transform(question: Questao, optionAttr: string): Questao["type"]["options"] {
    if (!question) return [];
    if (!optionAttr) return question.type.options;

    const retorno = question.type.options.filter(
      (option: any) => option.property === optionAttr.toLowerCase()
    );

    return retorno;
  }
}
