﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Status7Mod5GridComponent } from './components/status7-mod5-grid/status7-mod5-grid.component';
import { Status7Mod5 } from './../../models/status7-mod5';

import { Status7Mod5Service } from './../../services/status7-mod5.service';

@Component({
  selector: 'app-mod5-status7-mod5-page',
  templateUrl: './status7-mod5-page.component.html',
  providers: [
    Status7Mod5Service
  ]
})
export class Status7Mod5PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Status7Mod5;

  @ViewChild('grid') grid: Status7Mod5GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private status7Mod5Service: Status7Mod5Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod5.status7Mod5.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Status7Mod5;
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
    this.router.navigate(['/mod5/status7-mod5', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.status7Mod5Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
