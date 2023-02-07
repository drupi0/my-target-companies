import { Component } from '@angular/core';
import { Company } from '../interface/app-interface';
import { EffectService } from '../state/effect.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private effect: EffectService) {}

  currentCompany: Company = {
    name: "",
    remarks: "",
    hasApplied: false,
    hasApplicationDeclined: false
  };


  save() {
    this.effect.saveCompany(this.currentCompany).subscribe((isSaved: boolean) => {
      if(isSaved) {
        this.clearForm();
      }
    });
  }

  clearForm() {
    this.currentCompany = {
      name: "",
      remarks: "",
      hasApplied: false,
      hasApplicationDeclined: false
    };
  }
}
