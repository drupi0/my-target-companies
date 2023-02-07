import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Company } from '../interface/app-interface';
import { EffectService } from '../state/effect.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private effect: EffectService) {}

  private onDestroy$ = new Subject();

  companyList: Company[] = [];

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }


  ngOnInit(): void {
    this.effect.companies().pipe(takeUntil(this.onDestroy$))
        .subscribe((companyListFromState: Company[]) => this.companyList = companyListFromState);

  }

  search() {

  }

  update(company: Company) {
    this.effect.updateCompany(company).subscribe();
  }

  delete(company: Company) {
    this.effect.deleteCompany(company).subscribe();
  }
}
