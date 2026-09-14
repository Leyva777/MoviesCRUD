import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectorService } from './services/director.service';
import { MovieService } from './services/movie.service';
import { Director } from './models/director.model';
import { Movie } from './models/movie.model';

// componente principal
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // pestaña actual
  tab: string = 'directores';

  // lista de directores
  directores: Director[] = [];
  // lista de pelis
  movies: Movie[] = [];

  // formulario director
  directorForm: Director = {
    pkDirector: 0,
    name: '',
    age: 0,
    active: true
  };

  // formulario pelicula
  movieForm: Movie = {
    pkMovies: 0,
    name: '',
    gender: '',
    duration: '01:30:00',
    fkDirector: 0
  };

  // modo edicion
  esEditDirector: boolean = false;
  esEditMovie: boolean = false;

  constructor(
    private directorService: DirectorService,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // carga los datos al iniciar
    this.obtenerDirectores();
    this.obtenerMovies();
  }

  // cambia la pestaña
  setTab(t: string) {
    this.tab = t;
    this.cdr.detectChanges();
  }

  // jala directores
  obtenerDirectores() {
    this.directorService.getDirectores().subscribe({
      next: (data) => {
        this.directores = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('error obteniendo directores', err);
      }
    });
  }

  // jala pelis
  obtenerMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('error obteniendo peliculas', err);
      }
    });
  }

  // guarda o edita director
  guardarDirector() {
    if (this.esEditDirector && this.directorForm.pkDirector) {
      this.directorService.editarDirector(this.directorForm.pkDirector, this.directorForm).subscribe({
        next: () => {
          this.obtenerDirectores();
          this.limpiarDirector();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.directorService.crearDirector(this.directorForm).subscribe({
        next: () => {
          this.obtenerDirectores();
          this.limpiarDirector();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // selecciona director para editar
  seleccionarDirector(d: Director) {
    this.directorForm = { ...d };
    this.esEditDirector = true;
    this.cdr.detectChanges();
  }

  // borra director
  borrarDirector(id?: number) {
    const targetId = id || (id as any);
    if (!targetId) return;
    if (confirm('seguro que quieres borrar al director?')) {
      this.directorService.eliminarDirector(targetId).subscribe({
        next: () => {
          this.obtenerDirectores();
          this.obtenerMovies();
        },
        error: (err) => {
          console.error('error al eliminar director', err);
          // aunque haya error o 404 por desfasamiento, se refresca la vista
          this.obtenerDirectores();
          this.obtenerMovies();
        }
      });
    }
  }

  // resetea form director
  limpiarDirector() {
    this.directorForm = {
      pkDirector: 0,
      name: '',
      age: 0,
      active: true
    };
    this.esEditDirector = false;
    this.cdr.detectChanges();
  }

  // guarda o edita movie
  guardarMovie() {
    // convierte fkDirector 0 a null para evitar fallos de llave foranea en postgres
    const payload: Movie = {
      ...this.movieForm,
      fkDirector: (this.movieForm.fkDirector && Number(this.movieForm.fkDirector) > 0) ? Number(this.movieForm.fkDirector) : undefined
    };

    if (this.esEditMovie && payload.pkMovies) {
      this.movieService.editarMovie(payload.pkMovies, payload).subscribe({
        next: () => {
          this.obtenerMovies();
          this.limpiarMovie();
        },
        error: (err) => console.error('error al editar pelicula', err)
      });
    } else {
      this.movieService.crearMovie(payload).subscribe({
        next: () => {
          this.obtenerMovies();
          this.limpiarMovie();
        },
        error: (err) => console.error('error al crear pelicula', err)
      });
    }
  }

  // selecciona movie para editar
  seleccionarMovie(m: Movie) {
    this.movieForm = {
      ...m,
      fkDirector: m.fkDirector || 0
    };
    this.esEditMovie = true;
    this.cdr.detectChanges();
  }

  // borra movie
  borrarMovie(id?: number) {
    const targetId = id || (id as any);
    if (!targetId) return;
    if (confirm('deseas eliminar esta pelicula?')) {
      this.movieService.eliminarMovie(targetId).subscribe({
        next: () => {
          this.obtenerMovies();
        },
        error: (err) => {
          console.error('error al eliminar pelicula', err);
          this.obtenerMovies();
        }
      });
    }
  }

  // resetea form movie
  limpiarMovie() {
    this.movieForm = {
      pkMovies: 0,
      name: '',
      gender: '',
      duration: '01:30:00',
      fkDirector: 0
    };
    this.esEditMovie = false;
    this.cdr.detectChanges();
  }

  // obtiene nombre de director por id
  getNombreDirector(fk?: number): string {
    if (!fk) return 'Sin Director';
    const d = this.directores.find(x => x.pkDirector === fk);
    return d ? d.name : 'ID ' + fk;
  }
}
