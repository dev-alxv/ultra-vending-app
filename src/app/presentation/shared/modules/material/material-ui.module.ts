import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

const matModules = [
  CommonModule,
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatTabsModule,
  FormsModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatCardModule,
  MatRadioModule,
];

@NgModule({
  imports: [...matModules],
  exports: [...matModules],
  declarations: [],
})
export class MaterialUiModule {}
