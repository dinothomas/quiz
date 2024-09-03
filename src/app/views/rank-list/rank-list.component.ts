import {
  Component,
  OnInit,
  NgZone,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-questions',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss'],
})
export class RankListComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private ngZone: NgZone, private router: Router) {}
  displayedColumns: string[] = ['no', 'name', 'uid', 'noAttempt', 'noQuestions', 'score'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    let userData: any = localStorage.getItem('userDetails');
    userData = JSON.parse(userData);
    userData.sort(function (a: any, b: any) {
      return b.score - a.score;
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(userData);;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  goToReg(): void {
    this.router.navigate(['register']);
  }
}

export interface PeriodicElement {
  name: string;
  noAttempt: number;
  noQuestions: number;
  score: number;
  uid: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: '',
    noAttempt: 0,
    noQuestions: 5,
    score: 10,
    uid: 'U50455',
  },
];
