
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    getAll = (): Observable<Category[]> => this.http.get<Category[]>(`${environment.api}categories`).pipe(
        catchError(this.handleError),
        map(this.jsonDataToCategories)
    )

    getById = (id: number): Observable<Category> => {
        const url = `${environment.api}categories/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToCategory)
        )
    }

    create(category: Category): Observable<Category> {
        return this.http.post(`${environment.api}categories`, category).pipe(
            catchError(this.handleError),
            map(this.jsonDataToCategory)
        )
    }

    update(category: Category): Observable<Category> {
        const url = `${environment.api}categories/${category.id}`;

        return this.http.put(url, category).pipe(
            catchError(this.handleError),
            map(() => category)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${environment.api}categories/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }
 
    private jsonDataToCategories(jsonData: any[]): Category[] {
        const categories: Category[] = [];
        jsonData.forEach(element => categories.push(element as Category));
        return categories;
    }

    private jsonDataToCategory(jsonData: any[]): Category {
        return jsonData as Category;
    }

    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error)
    }
 
}
