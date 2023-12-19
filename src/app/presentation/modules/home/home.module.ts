import { NgModule } from '@angular/core';

import { UiCoreModule } from '../../shared/modules/ui-core/ui-core.module';
import { HomeComponent } from './home.component';

@NgModule({
  exports: [HomeComponent],
  declarations: [HomeComponent],
  imports: [
    // UI core
    UiCoreModule,
  ],
})
export class HomeModule {}
