import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModule } from '../modules/home/home.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [LayoutComponent, MainComponent, HeaderComponent],
  imports: [CommonModule, HomeModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
