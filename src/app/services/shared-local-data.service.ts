import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trainer, Sportsman } from '../models/model';



@Injectable()
export class SharedLocalDataService {

  private _sharedDataTrainerSource = new BehaviorSubject<Trainer[]>([]);
  private _sharedDataSportsmenSource = new BehaviorSubject<Sportsman[]>([]);

  sharedTrainerData$ = this._sharedDataTrainerSource.asObservable();
  sharedSportsmenData$ = this._sharedDataSportsmenSource.asObservable();

  constructor() { }

  getDataTrainer() {
    return this.sharedTrainerData$;
  }

  getDataSportsmen() {
    return this.sharedSportsmenData$;
  }

  updateSharedTrainerData(trainers: Trainer[]) {
    this._sharedDataTrainerSource.next(trainers);
  }

  updateSharedSportsmenData(sportsmen: Sportsman[]) {
    this._sharedDataSportsmenSource.next(sportsmen);
  }
}
