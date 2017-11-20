﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Project2Mod5GridComponent } from './components/project2-mod5-grid/project2-mod5-grid.component';
import { Project2Mod5 } from './../../models/project2-mod5';

import { Project2Mod5Service } from './../../services/project2-mod5.service';

@Component({
  selector: 'app-mod5-project2-mod5-page',
  templateUrl: './project2-mod5-page.component.html',
  providers: [
    Project2Mod5Service
  ]
})
export class Project2Mod5PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Project2Mod5;

  @ViewChild('grid') grid: Project2Mod5GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private project2Mod5Service: Project2Mod5Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod5.project2Mod5.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Project2Mod5;
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
    this.router.navigate(['/mod5/project2-mod5', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.project2Mod5Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
