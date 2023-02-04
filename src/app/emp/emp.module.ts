import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpComponent } from './emp-page/emp.component';
import { RouterModule, Routes } from '@angular/router';
import { EmpService } from './emp.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AddLeaveModalComponent } from './add-leave-modal/add-leave-modal.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

const Routing : Routes = [
  {
   path: '',
   component: EmpComponent
  }
];

@NgModule({
  declarations: [EmpComponent, AddLeaveModalComponent],
  imports: [
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatNativeDateModule,
    RouterModule.forChild(Routing),
    CommonModule,
    SharedModule
  ],
  providers:[EmpService,DatePipe]
})
export class EmpModule { }
