import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Entry } from '../../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

    constructor(private http: HttpClient) { }

    getAll = (): Observable<Entry[]> => this.http.get<Entry[]>(`${environment.api}entries`).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntries)
    )

    getById = (id: number): Observable<Entry> => {
        const url = `${environment.api}entries/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        )
    }

    create(entry: Entry): Observable<Entry> {
        return this.http.post(`${environment.api}entries`, entry).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        )
    }

    update(entry: Entry): Observable<Entry> {
        const url = `${environment.api}entries/${entry.id}`;

        return this.http.put(url, entry).pipe(
            catchError(this.handleError),
            map(() => entry)
        )
    }

    delete(id: number): Observable<any> {
        console.log(id)
        const url = `${environment.api}entries/${id}`;
        return this.http.delete(url);
    }
 
    private jsonDataToEntries(jsonData: any[]): Entry[] {
        const entries: Entry[] = [];

        jsonData.forEach(element =>{
            const entry =  Object.assign(new Entry(), element);
            entries.push(entry);
        });
        return entries;
    }

    private jsonDataToEntry(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error)
    }
}
