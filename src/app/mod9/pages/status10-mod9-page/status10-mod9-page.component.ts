﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Status10Mod9GridComponent } from './components/status10-mod9-grid/status10-mod9-grid.component';
import { Status10Mod9 } from './../../models/status10-mod9';

import { Status10Mod9Service } from './../../services/status10-mod9.service';

@Component({
  selector: 'app-mod9-status10-mod9-page',
  templateUrl: './status10-mod9-page.component.html',
  providers: [
    Status10Mod9Service
  ]
})
export class Status10Mod9PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Status10Mod9;

  @ViewChild('grid') grid: Status10Mod9GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status10Mod9Service: Status10Mod9Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod9.status10Mod9.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Status10Mod9;
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
    this.router.navigate(['/mod9/status10-mod9', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.status10Mod9Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
