﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Category6Mod7GridComponent } from './components/category6-mod7-grid/category6-mod7-grid.component';
import { Category6Mod7 } from './../../models/category6-mod7';

import { Category6Mod7Service } from './../../services/category6-mod7.service';

@Component({
  selector: 'app-mod7-category6-mod7-page',
  templateUrl: './category6-mod7-page.component.html',
  providers: [
    Category6Mod7Service
  ]
})
export class Category6Mod7PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Category6Mod7;

  @ViewChild('grid') grid: Category6Mod7GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private category6Mod7Service: Category6Mod7Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod7.category6Mod7.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Category6Mod7;
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
    this.router.navigate(['/mod7/category6-mod7', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.category6Mod7Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
