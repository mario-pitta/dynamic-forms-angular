import { NgModule } from '@angular/core';
import { FilterQuestionOptionsPipe } from './filterQuestionOptions.pipe';

@NgModule({
  declarations: [FilterQuestionOptionsPipe],
  exports: [FilterQuestionOptionsPipe],
})
export class PipesModule {}
