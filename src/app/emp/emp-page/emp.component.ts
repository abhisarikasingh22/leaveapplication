import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../emp.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-emp-page',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css'],
})
export class EmpComponent implements OnInit {

  displayedColumns: string[] = ['id','applicantName', 'managerName', 'startDate', 'endDate','returnDate', 'numberOfDays', 'comments'];
  dataSource : any = new MatTableDataSource<EmpLeaveData>();

  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('leaveData')){
      this.getLeaveApplicationData()
    }
  }

  getLeaveApplicationData(){
    let empData : any = localStorage.getItem('leaveData')
    this.dataSource = new MatTableDataSource<EmpLeaveData>(JSON.parse(empData));
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openModal(addModal : any) {
    const dialogRef = this.dialog.open(addModal);
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveApplicationData()
    });
  }
}

export interface EmpLeaveData {
  id: number;
  applicantId: string;
  applicantName: string;
  managerId: string;
  managerName: string;
  startDate: string;
  endDate: string;
  returnDate: string;
  numberOfDays: number;
  comments: string;
}