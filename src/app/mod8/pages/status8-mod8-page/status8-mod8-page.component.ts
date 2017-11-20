﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Status8Mod8GridComponent } from './components/status8-mod8-grid/status8-mod8-grid.component';
import { Status8Mod8 } from './../../models/status8-mod8';

import { Status8Mod8Service } from './../../services/status8-mod8.service';

@Component({
  selector: 'app-mod8-status8-mod8-page',
  templateUrl: './status8-mod8-page.component.html',
  providers: [
    Status8Mod8Service
  ]
})
export class Status8Mod8PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Status8Mod8;

  @ViewChild('grid') grid: Status8Mod8GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status8Mod8Service: Status8Mod8Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod8.status8Mod8.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Status8Mod8;
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
    this.router.navigate(['/mod8/status8-mod8', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.status8Mod8Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
