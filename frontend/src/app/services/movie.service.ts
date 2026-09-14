import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

// servicio de peliculas
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // url api c#
  private url = 'http://localhost:5118/api/Movie';

  constructor(private http: HttpClient) { }

  // trae pelis
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }

  // guarda peli
  crearMovie(m: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, m);
  }

  // modifica peli
  editarMovie(id: number, m: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.url}/${id}`, m);
  }

  // quita peli con responseType text
  eliminarMovie(id: number): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
