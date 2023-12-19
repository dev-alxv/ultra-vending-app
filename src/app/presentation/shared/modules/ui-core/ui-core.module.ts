import { NgModule } from '@angular/core';
import { MaterialUiModule } from '../material/material-ui.module';

const uiModules = [MaterialUiModule];

@NgModule({
  imports: [...uiModules],
  exports: [...uiModules],
  declarations: [],
})
export class UiCoreModule {}
