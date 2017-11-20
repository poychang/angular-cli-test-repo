﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Project5Mod2GridComponent } from './components/project5-mod2-grid/project5-mod2-grid.component';
import { Project5Mod2 } from './../../models/project5-mod2';

import { Project5Mod2Service } from './../../services/project5-mod2.service';

@Component({
  selector: 'app-mod2-project5-mod2-page',
  templateUrl: './project5-mod2-page.component.html',
  providers: [
    Project5Mod2Service
  ]
})
export class Project5Mod2PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Project5Mod2;

  @ViewChild('grid') grid: Project5Mod2GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project5Mod2Service: Project5Mod2Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod2.project5Mod2.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Project5Mod2;
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
    this.router.navigate(['/mod2/project5-mod2', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.project5Mod2Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
