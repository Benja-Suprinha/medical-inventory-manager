import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsComponent } from 'app/icons/icons.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { TableListComponent } from 'app/table-list/table-list.component';
import { TypographyComponent } from 'app/typography/typography.component';
import { UpgradeComponent } from 'app/upgrade/upgrade.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';

export const MainLayoutRoutes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'table-list',     component: TableListComponent },
  { path: 'typography',     component: TypographyComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade',        component: UpgradeComponent },
];
