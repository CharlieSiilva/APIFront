import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI }  from '../../modelos/response.interface';
import { ListarecibosI} from '../../modelos/listaRecibos.interface';
import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://localhost:44317"
  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "/api/Usuarios"
    return this.http.post<ResponseI>(direccion, form)
  }

  getReceipts(usuario:number):Observable<ListarecibosI[]>{
    let direccion = this.url + "/api/Recibos/" + usuario;
    return this.http.get<ListarecibosI[]>(direccion);
  }

  getReceiptById(id):Observable<ListarecibosI>{
    let direccion = this.url + "/api/ReciboUnitario/" + id;
    return this.http.get<ListarecibosI>(direccion);
  }

  putRecibo(form:ListarecibosI):Observable<ResponseI>{
    let direccion = this.url + "/api/Recibos/" + form.idRecibo;
    return this.http.put<ResponseI>(direccion, form);
  }

  deleteRecibo(form:ListarecibosI):Observable<ResponseI>{
    let direccion = this.url + "/api/Recibos/" + form.idRecibo;
    let Options = {
      headers: new HttpHeaders({
        "Conten-type": "application/json"
      }),
      body: form
    }
    return this.http.delete<ResponseI>(direccion, Options);
  }

  postRecibo(form:ListarecibosI):Observable<ResponseI>{
    let direccion = this.url + "/api/Recibos";
    return this.http.post<ResponseI>(direccion, form);
  }
}
