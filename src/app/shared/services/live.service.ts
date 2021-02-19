import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageableDTO } from '../models/responsePageable';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  private readonly apiURl = "http://localhost:";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getLivesWithFlag(flag: string): Observable<ResponsePageableDTO> {
    return this.fakeData();

    //return this.httpClient.get<ResponsePageableDTO>(`${this.apiURl}?flag=${flag}`);
  }

  private fakeData(): Observable<ResponsePageableDTO> {
    const response:ResponsePageableDTO = {
      content:[ {
        id: uuid.v4(),
        liveName: "Teste",
        channelName: "",
        liveDate: "",
        liveTime: "",
        liveLink: "",
        registrationDate: ""
      }],
      first: false,
      last: false,
      number: 0,
      numberOfElements: 0,
      pageable: [],
      size: 0,
      sort: 0,
      totalElements: 2,
      totalPages: 1
    };

    const observable = new Observable<ResponsePageableDTO>(subscriber => {
      setTimeout(() => {
        subscriber.next(response);
      }, 1000);
    });

    return observable;
  }
}
