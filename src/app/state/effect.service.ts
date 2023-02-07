import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Company } from '../interface/app-interface';
import { ApiService } from '../services/api.service';
import { StoreService, AppState, ActionType } from './store.service';
import { NotifierService } from 'angular-notifier'

@Injectable({
  providedIn: 'root'
})
export class EffectService{

  constructor(private api: ApiService, private store: StoreService,
                private notification: NotifierService) { }

  companies(): Observable<Company[]> {
    return this.store.currentState$.pipe(map((state: AppState) => state.state), switchMap((companyList: Company[]) => {

      if(!companyList.length) {
        return this.api.getCompanies().pipe(tap((companies: Company[]) => {
          this.store.dispatch(ActionType.ADD, {
            state: companies
          })
        }));
      }

      return of(companyList);

    }));
  }

  saveCompany(company: Company): Observable<boolean> {
    return this.api.saveCompany(company).pipe(catchError((err) => {
      this.notification.notify('error', err.message ? err.message : err);

      return EMPTY;

    }), tap((company: Company) => {

      this.store.dispatch(ActionType.ADD,<AppState> {
        state: [company]
      });

      this.notification.notify('success', `Company ${company.name} is saved.`);
    }) ,
    switchMap((response: Company) => !response ? of(false) : of(true))
    );

  }

  updateCompany(company: Company) {
    return this.api.updateCompany(company).pipe(catchError((err) => {
      this.notification.notify('error', err.message ? err.message : err);

      return EMPTY;

    }), tap((company: Company) => {

      this.store.dispatch(ActionType.ADD, <AppState> {
        state: [company]
      });

      this.notification.notify('success', `Company ${company.name} is updated.`);
    }) ,
    switchMap((response: Company) => !response ? of(false) : of(true))
    );
  }

  deleteCompany(company: Company) {
    return this.api.deleteCompany(company).pipe(tap((resp: boolean) => {
      if(resp) {
        this.store.dispatch(ActionType.DELETE, { state: [company]});
        this.notification.notify('success', `Company ${company.name} has been deleted.`);
      }
    }));
   
  }


}
