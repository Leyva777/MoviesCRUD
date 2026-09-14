# Explicacion General de Archivos del Proyecto

Este documento describe brevemente la funcion de cada archivo en el proyecto backend (.NET) y frontend (Angular).

---

## Archivos de Raiz del Proyecto

- **scriptSQL.txt**: Contiene las sentencias SQL de migracion/creacion de las tablas `Director` y `Movies` en PostgreSQL.
- **explicacion_archivos.md**: Documento de explicacion general de la estructura de archivos.
- **como_ejecutar.md**: Guia paso a paso para levantar el backend y frontend en entorno local.

---

## Archivos del Backend (.NET C#)

### Raiz del Backend (`backend/`)
- **Program.cs**: Archivo principal donde se arranca la API, se registran los controladores, se configura la conexion a PostgreSQL via DbContext, Swagger/OpenAPI y CORS.
- **backend.csproj**: Archivo de configuracion del proyecto .NET que define dependencias como `Npgsql.EntityFrameworkCore.PostgreSQL` y la version del framework (net10.0).
- **appsettings.json**: Archivo JSON de configuracion donde esta definida la cadena de conexion `DefaultConnection` a la base de datos PostgreSQL local.
- **appsettings.Development.json**: Configuracion especifica de logs para el entorno de desarrollo.
- **backend.http**: Archivo de pruebas HTTP simples para ejecutar endpoints desde la IDE.

### Modelos (`backend/Models/`)
- **Director.cs**: Modelo C# que representa la entidad/tabla `Director` (`PKDirector`, `Name`, `Age`, `Active`).
- **Movie.cs**: Modelo C# que representa la entidad/tabla `Movies` (`PKMovies`, `Name`, `Gender`, `Duration`, `FKDirector`).

### Data (`backend/Data/`)
- **AppDbContext.cs**: Clase DbContext de Entity Framework Core que conecta la aplicacion a la base de datos PostgreSQL y mapea los DbSets.

### Controladores (`backend/Controllers/`)
- **DirectorController.cs**: Controlador API que expone los endpoints GET, POST, PUT y DELETE para administrar directores.
- **MovieController.cs**: Controlador API que expone los endpoints GET, POST, PUT y DELETE para administrar peliculas.

### Propiedades (`backend/Properties/`)
- **launchSettings.json**: Define los perfiles de ejecucion local (puerto HTTP 5118 y HTTPS 7100).

---

## Archivos del Frontend (Angular)

### Raiz del Frontend (`frontend/`)
- **package.json**: Archivo de definicion de scripts y dependencias de Angular (se gestiona con `pnpm`).
- **pnpm-lock.yaml**: Archivo de bloqueo de versiones de dependencias generadas por `pnpm`.
- **angular.json**: Configuracion general del workspace Angular y parametros de compilacion.
- **tsconfig.json**, **tsconfig.app.json**, **tsconfig.spec.json**: Archivos de configuracion del compilador TypeScript.

### Codigo Fuente (`frontend/src/app/`)
- **app.config.ts**: Configuracion general del cliente Angular, donde se proveen las rutas y `HttpClient`.
- **app.routes.ts**: Definicion de rutas para el enrutador de Angular.
- **app.ts**: Componente principal que contiene la logica del CRUD (directores y peliculas, metodos de guardado, edicion y eliminacion).
- **app.html**: Plantilla HTML con la interfaz de usuario moderna (pestanas, formularios y tablas de datos).
- **app.css**: Estilos CSS para el layout visual estilo glassmorphism.

### Modelos Frontend (`frontend/src/app/models/`)
- **director.model.ts**: Interfaz TypeScript con la estructura de un Director.
- **movie.model.ts**: Interfaz TypeScript con la estructura de una Pelicula.

### Servicios Frontend (`frontend/src/app/services/`)
- **director.service.ts**: Servicio Angular encargado de realizar las peticiones HTTP al backend de Directores (`http://localhost:5118/api/Director`).
- **movie.service.ts**: Servicio Angular encargado de realizar las peticiones HTTP al backend de Peliculas (`http://localhost:5118/api/Movie`).
