import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director.model';

// servicio para llamar a los directores
@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  // url de la api en c#
  private url = 'http://localhost:5118/api/Director';

  constructor(private http: HttpClient) { }

  // trae todo
  getDirectores(): Observable<Director[]> {
    return this.http.get<Director[]>(this.url);
  }

  // mete uno
  crearDirector(d: Director): Observable<Director> {
    return this.http.post<Director>(this.url, d);
  }

  // edita uno
  editarDirector(id: number, d: Director): Observable<Director> {
    return this.http.put<Director>(`${this.url}/${id}`, d);
  }

  // borra por id con responseType text para evitar errores de parseo
  eliminarDirector(id: number): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
