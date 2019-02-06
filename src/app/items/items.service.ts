import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from './items';
import { catchError, map } from 'rxjs/operators';

const options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ItemsService {

    private url = 'http://localhost:8000';
    private act = 'update';
    private upd = 'upload';

    constructor(private http: HttpClient) { }

    loadProducts(): Observable<Items[]>  {
        let products = this.http.get<Items[]>("/api/products");
        return products;
    }


    getItems(): Observable<Items[]> {
        let url = `${this.url}`;
          return this.http.get<Items[]>(url, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getItem(_id: string): Observable<Items[]> {
        let url = `${this.url}/${_id}`;
        return this.http.get<Items[]>(url, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    addItem(item: Items) {
        let url = `${this.url}`;
        let iJson = JSON.stringify(item);
        return this.http.post(url, iJson, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    } 

    increaseItem(item: Items) {
        let accion = "increase";
        let url = `${this.url}/${accion}`;
        let iJson = JSON.stringify(item);
        return this.http.put(url, iJson, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    decreaseItem(item: Items) {
        let accion = "decrease";
        let url = `${this.url}/${accion}`;
        let iJson = JSON.stringify(item);
        return this.http.put(url, iJson, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    updateItem(_id: string, item: Items) {
        let url = `${this.url}/${this.act}/${_id}`;
        let iJson = JSON.stringify(item);
        return this.http.put(url, iJson, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    deleteItem(_id: string) {
        let url = `${this.url}/${_id}`;
        return this.http.delete(url, options)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    // Upload File
    postFile(_id: string, files: File): Observable<boolean> {
        let url = `${this.url}/${this.upd}/${_id}`;
        const formData: FormData = new FormData();
        formData.append('file', files, _id);
        return this.http.post<boolean>(url, formData)
        .pipe(
            map(() => { return true; }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}