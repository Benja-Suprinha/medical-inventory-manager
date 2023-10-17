import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutes } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IconsComponent } from 'app/icons/icons.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { TypographyComponent } from 'app/typography/typography.component';
import { UpgradeComponent } from 'app/upgrade/upgrade.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})
export class MainModule { }
