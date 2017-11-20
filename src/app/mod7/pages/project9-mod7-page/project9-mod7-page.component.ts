﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Project9Mod7GridComponent } from './components/project9-mod7-grid/project9-mod7-grid.component';
import { Project9Mod7 } from './../../models/project9-mod7';

import { Project9Mod7Service } from './../../services/project9-mod7.service';

@Component({
  selector: 'app-mod7-project9-mod7-page',
  templateUrl: './project9-mod7-page.component.html',
  providers: [
    Project9Mod7Service
  ]
})
export class Project9Mod7PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Project9Mod7;

  @ViewChild('grid') grid: Project9Mod7GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project9Mod7Service: Project9Mod7Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod7.project9Mod7.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Project9Mod7;
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
    this.router.navigate(['/mod7/project9-mod7', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.project9Mod7Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
