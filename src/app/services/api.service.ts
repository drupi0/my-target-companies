import { Injectable, OnDestroy } from '@angular/core';
import { Client, Databases, ID, Models } from 'appwrite';
import { catchError, EMPTY, from, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Company } from '../interface/app-interface';

interface ApiServiceModel {
  saveCompany: (company: Company) => Observable<boolean>,
  getCompanies: () => Observable<Company[]>,
  updateCompany: (company: Company) => Observable<boolean>;
}

const appConfigs = {
  appwriteURL: "https://appwrite.coffeeandpaste.co/v1",
  projectId: "63d349ed53509f821a56",
  databaseId: "63d34b3b7c9080a98338",
  collectionId: "63d34b52b29e9146421d"
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiServiceModel, OnDestroy {

  readonly client = new Client().setEndpoint(appConfigs.appwriteURL).setProject(appConfigs.projectId);
  readonly database = new Databases(this.client)

  onDestroy$: Subject<any> = new Subject();

  constructor() { }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  saveCompany(company: Company) {
    return from(this.database.createDocument(appConfigs.databaseId, appConfigs.collectionId, ID.unique(), company))
      .pipe(catchError((err) => {
        if (err) {
          alert(err.message);
        }

        return EMPTY;

      }), switchMap((response: Models.Document) => !response ? of(false) : of(true)));
  }

  getCompanies(): Observable<Company[]> {
    return from(this.database.listDocuments(appConfigs.databaseId, appConfigs.collectionId)).pipe(map((response: Models.DocumentList<Models.Document>) => {
      const { documents } = response;
      return documents.map(document => <Company>{
        name: document["name"],
        remarks: document["remarks"],
        hasApplied: document["hasApplied"],
        hasApplicationDeclined: document["hasApplicationDeclined"]
      })
    }))
  }

  updateCompany(company: Company) {
    return from(this.database.updateDocument(appConfigs.databaseId, appConfigs.collectionId, ID.unique(), company))
      .pipe(catchError((err) => {
        if (err) {
          alert(err.message);
        }

        return EMPTY;

      }), switchMap((response: Models.Document) => !response ? of(false) : of(true)));
  }
}
