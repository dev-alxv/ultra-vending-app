import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ErrorInterceptor } from './data/providers/interceptors/error.interceptor';
import { HttpInterceptorService } from './data/providers/interceptors/http.interceptor';
import { LayoutModule } from './presentation/layout/layout.module';
import { UiCoreModule } from './presentation/shared/modules/ui-core/ui-core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    HttpClientModule,

    // UI core
    UiCoreModule,

    // Core "singleton" modules (not feature modules)
    LayoutModule,
  ],
  providers: [
    // INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
