import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private apiService : ApiService,private datePipe: DatePipe) { }

  empData(){
    return this.apiService.get('/users')
  }

  dateValidator(startDate : any,endDate : any) {
    return (formGroup: FormGroup) => {
      const startDateControl = formGroup.controls[startDate];
      const endDateControl = formGroup.controls[endDate];

      let firstDate = this.datePipe.transform(startDateControl.value,'yyyy-MM-dd')
      let secondDate = this.datePipe.transform(endDateControl.value,'yyyy-MM-dd')

      if (!firstDate || !secondDate) {
        return null;
      }

      if (endDateControl.errors && !endDateControl.errors) {
        return null;
      }
    
      if (secondDate && firstDate && secondDate < firstDate) {
        return endDateControl.setErrors({ invalidDateRange: true });
      } else {
        return endDateControl.setErrors(null);
      }
    }
  }

  uniqueUser(applicantId:any,managerId: any){
    return (formGroup: FormGroup) => {
      const applicantIdControl = formGroup.controls[applicantId];
      const managerIdControl = formGroup.controls[managerId];

      let applicantIdVal = applicantIdControl.value
      let managerIdVal = managerIdControl.value

      if (!applicantIdVal || !managerIdVal) {
        return null;
      }

      if (managerIdControl.errors && !managerIdControl.errors) {
        return null;
      }

      if (managerIdVal && applicantIdVal && managerIdVal === applicantIdVal) {
        return managerIdControl.setErrors({ invalidManagerId: true });
      } else {
        return managerIdControl.setErrors(null);
      }
    }
  }


}
