import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from '../interface/app-interface';

export enum ActionType {
  FETCH = "[Company] Fetch Company",
  UPDATE = "[Company] Update Company",
  DELETE = "[Company] Delete Company",
  ADD = "[Company] Add Company"
}

export interface AppState {
  state: Company[]
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private currentState: AppState = {
    state: []
  };
  currentState$: BehaviorSubject<AppState> = new BehaviorSubject(this.currentState);

  dispatch(action: ActionType, state: AppState) {
    switch(action) {
      case ActionType.ADD:
        this.currentState.state.push(...state.state);
        break;
      case ActionType.UPDATE:
        if(state.state.length) {
          state.state.forEach(companyFromState => {
            const findItemIndex = this.currentState.state.findIndex((company: Company) => 
                            company.name === companyFromState.name);

            if(findItemIndex !== -1) {
                this.currentState.state[findItemIndex] = companyFromState;
            }
          });
        }
        this.currentState.state.push(...state.state);
        break;  
      case ActionType.DELETE:
        if(state.state.length) {
          state.state.forEach(companyFromState => {
            const findItemIndex = this.currentState.state.findIndex((company: Company) => 
                            company.id === companyFromState.id);
                            
            if(findItemIndex !== -1) {
              this.currentState.state.splice(findItemIndex, 1);
            }
          });
        }

        break;
    }

    this.currentState$.next(this.currentState);
  }

  constructor() { }


}
