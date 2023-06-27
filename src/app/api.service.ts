import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) { }
	getProducts() {
		const headers = new HttpHeaders().set('Authorization', `${this.currentUserToken}`);
		return this.http.get(
			'http://localhost:3000/api/products',{headers:headers});
	}

	addProduct(product: any): Observable<any> {
		if(this.currentUserToken!=='')
		product.userToken= this.currentUserToken;
		return this.http.post('http://localhost:3000/api/products',product);
	}

	updateProduct(id: string,product: any): Observable<any> {
		return this.http.put(`http://localhost:3000/api/products/${id}`,product);
	}

	deleteProduct(id: string): Observable<any> {
		return this.http.delete('http://localhost:3000/api/products/'+id)
	}

	public currentUserToken: string | undefined | null;
}
