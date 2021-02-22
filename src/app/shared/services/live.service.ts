import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ResponsePageableDTO } from '../models/responsePageable';
import { LiveDTO } from '../models/live';

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

  public postLives(live: any): Observable<LiveDTO> {
    return this.httpClient.post<any>(this.apiURl, live, this.httpOptions);
  }

  private fakeData(): Observable<ResponsePageableDTO> {
    const contents = [ {
      id: uuidv4(),
      liveName: "Teste",
      channelName: "",
      liveDate: "",
      liveTime: "",
      liveLink: "",
      registrationDate: ""
    },
    {
      id: uuidv4(),
      liveName: "Teste",
      channelName: "",
      liveDate: "",
      liveTime: "",
      liveLink: "",
      registrationDate: ""
    }];

    const response:ResponsePageableDTO = {
      content: contents,
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
      }, 3000);
    });

    return observable;
  }
}
