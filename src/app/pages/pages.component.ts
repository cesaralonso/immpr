import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class='al-footer-right' translate>manyimmprenzza8_5a79be6ae9a41</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; Software Insights 2018</div>
        <ul class="al-share clearfix">
          <li></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
