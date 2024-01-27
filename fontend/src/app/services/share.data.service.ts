import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private facebookAccountIdSource = new BehaviorSubject<number>(0);
  currentFacebookAccountId = this.facebookAccountIdSource.asObservable();

  constructor() { }

  changeFacebookAccountId(facebookAccountId: number) {
    this.facebookAccountIdSource.next(facebookAccountId);
  }
}
