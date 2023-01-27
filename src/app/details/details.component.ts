import { Component } from '@angular/core';
import { Company } from '../interface/app-interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  companyList: Company[] = [{
    name: "trustarc",
    remarks: "good",
    hasApplicationDeclined: true,
    hasApplied: true
  },
  {
    name: "trustarc",
    remarks: "good",
    hasApplicationDeclined: true,
    hasApplied: true
  },
  {
    name: "trustarc",
    remarks: "good",
    hasApplicationDeclined: true,
    hasApplied: true
  }];

  search() {

  }

  update(companyIndex: number) {

  }

  delete(companyIndex: number) {

  }
}
