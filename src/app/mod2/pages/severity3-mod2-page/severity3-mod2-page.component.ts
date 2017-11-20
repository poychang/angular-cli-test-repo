﻿import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthService } from './../../../shared/services/auth.service';
import { HelperService } from './../../../shared/services/helper.service';
import { PageComponent } from './../../../shared/components/page/page.component';
import { Severity3Mod2GridComponent } from './components/severity3-mod2-grid/severity3-mod2-grid.component';
import { Severity3Mod2 } from './../../models/severity3-mod2';

import { Severity3Mod2Service } from './../../services/severity3-mod2.service';

@Component({
  selector: 'app-mod2-severity3-mod2-page',
  templateUrl: './severity3-mod2-page.component.html',
  providers: [
    Severity3Mod2Service
  ]
})
export class Severity3Mod2PageComponent extends PageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public newRecord: boolean;
  public item: Severity3Mod2;

  @ViewChild('grid') grid: Severity3Mod2GridComponent;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    authService: AuthService,
    private helperService: HelperService,
    private severity3Mod2Service: Severity3Mod2Service) {
    super(router, authService);
  }

  ngOnInit() {
    super.checkPermission('mod2.severity3Mod2.select');
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.edit(id);
        } else if (id === '') {
          this.item = {} as Severity3Mod2;
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
    this.router.navigate(['/mod2/severity3-mod2', { id: '' }]);
  }

  private edit(id: number): void {
    this.grid.isLoading = true;
    this.newRecord = false;
    this.severity3Mod2Service
      .getById(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(item => {
        this.item = item;
        this.grid.isLoading = false;
      });
  }

}
