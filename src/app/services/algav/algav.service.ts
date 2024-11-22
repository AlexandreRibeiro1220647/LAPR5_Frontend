import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReturnToken} from '../../models/operation-schedules/returnToken';


@Injectable({
  providedIn: 'root'
})
export class AlgavService {

  constructor(private http: HttpClient, @Inject('PLANNING_URL') private planning_url: string) { }

  getItems(operationId: string, date: number): Observable<ReturnToken> {
    return this.http.get<ReturnToken>(`${this.planning_url}/obtain_better_solution?or=${operationId}&date=${date}`);
  }

}
