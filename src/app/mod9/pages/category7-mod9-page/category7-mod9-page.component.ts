﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category7Mod9GridComponent } from './components/category7-mod9-grid/category7-mod9-grid.component';
import { Category7Mod9 } from './../../models/category7-mod9';

import { Category7Mod9Service } from './../../services/category7-mod9.service';

@Component({
  selector: 'app-mod9-category7-mod9-page',
  templateUrl: './category7-mod9-page.component.html',
  providers: [
    Category7Mod9Service
  ]
})
export class Category7Mod9PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category7Mod9;

  @ViewChild('grid') grid: Category7Mod9GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category7Mod9Service: Category7Mod9Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod9.category7Mod9.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category7Mod9;
        } else {
          this.item = null;
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public new(): void {
    this.newRecord = true;
    this.router.navigate(['/mod9/category7-mod9', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category7Mod9Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
