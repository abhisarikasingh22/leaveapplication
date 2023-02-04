import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-leave-modal',
  templateUrl: './add-leave-modal.component.html',
  styleUrls: ['./add-leave-modal.component.css']
})
export class AddLeaveModalComponent implements OnInit {
  empList : Array<any> = []
  leaveForm : any = FormGroup
  
  constructor(private fb: FormBuilder,private empService : EmpService,private datePipe: DatePipe){ }

  ngOnInit(): void {
    this.buildForm()
    this.getEmpData()
  }

  getEmpData(){
    this.empService.empData().subscribe(data=>{
      console.log(data)
      this.empList = data
    },(error)=>{
      console.log(error)
    })
  }

  buildForm() {
    this.leaveForm = this.fb.group({
      'applicantId': ['', [Validators.required]],
      'managerId': ['', [Validators.required]],
      'startDate': ['', [Validators.required]],
      'endDate': ['', [Validators.required]],
      'returnDate': ['', [Validators.required]],
      'numberOfDays': ['', [Validators.required]],
      'comments': [''],
    },
      {validator: [this.empService.dateValidator("startDate", 'endDate'),this.empService.dateValidator("endDate", 'returnDate'),this.empService.uniqueUser('applicantId','managerId')]}
    );
  }

  noOfDays(){
    if(!this.leaveForm.controls['endDate'].hasError('invalidDateRange')){
      let Difference_In_Time = (this.leaveForm.value.endDate).getTime() - (this.leaveForm.value.startDate).getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      console.log(Difference_In_Days+1)
      this.leaveForm.controls["numberOfDays"].setValue(Difference_In_Days+1)
    } else {
      this.leaveForm.controls["numberOfDays"].setValue("")
    }
  }

  submit(){
    let empData : any = []
    if(localStorage.getItem('leaveData')){
      empData = localStorage.getItem('leaveData')
    }
    let dataVal = this.leaveForm.value
    dataVal.id = empData.length==0 ? 1 :  ((JSON.parse(empData)).length) + 1
    dataVal.applicantName = this.empList.find(v=>v.id==this.leaveForm.value.applicantId).name
    dataVal.managerName = this.empList.find(v=>v.id==this.leaveForm.value.managerId).name
    let oldVal = empData.length>0 ? (JSON.parse(empData)) : []
    oldVal.push(dataVal)
    localStorage.setItem('leaveData',JSON.stringify(oldVal))
  }
}
