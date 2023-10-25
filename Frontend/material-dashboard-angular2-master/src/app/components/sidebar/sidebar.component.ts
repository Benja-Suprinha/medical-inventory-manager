import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/principal/resumen', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/principal/users', title: 'Ver Usuarios', icon: 'content_paste', class: '' },
  { path: '/principal/create', title: 'Crear Usuarios', icon: 'library_books', class: '' },
];
export const ROUTES1: RouteInfo[] = [
  { path: '/principal/resumen', title: 'Dashboard', icon: 'dashboard', class: '' },
]
export const ROUTES2: RouteInfo[] = [
  { path: '/principal/resumen', title: 'Dashboard', icon: 'dashboard', class: '' },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  type_user = sessionStorage.getItem('role')
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    if(this.type_user === 'admin') this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(this.type_user === 'encargado_inventario') this.menuItems = ROUTES1.filter(menuItems => menuItems)
    if(this.type_user === 'personal_medico') this.menuItems = ROUTES2.filter(menuItems => menuItems)
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
