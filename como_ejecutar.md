# Guia de Ejecucion Local del Proyecto

Este documento describe como clonar el proyecto desde GitHub, levantar la base de datos PostgreSQL, el backend en .NET C# y el frontend en Angular utilizando `pnpm`.

---

## Prerrequisitos

1. **Git**: Tener instalado Git para clonar el repositorio.
2. **PostgreSQL**: Tener instalado y corriendo un servidor de PostgreSQL en local.
3. **.NET SDK**: Teniendo instalado .NET 10 (o .NET 8/9 compatible).
4. **Node.js y pnpm**: Tener instalado Node.js y el gestor de paquetes `pnpm`.

---

## Paso 1: Descargar el Proyecto desde GitHub

1. Abre una terminal o consola de comandos.
2. Clona el repositorio desde GitHub ejecutando el siguiente comando:
   ```bash
   git clone https://github.com/Leyva777/MoviesCRUD
   ```
   *Nota: Tambien puedes descargar el codigo haciendo clic en el boton "Code" > "Download ZIP" en GitHub y descomprimiendo el archivo.*

3. Navega al directorio raiz del proyecto clonado:
   ```bash
   cd CrudJabil
   ```

---

## Paso 2: Configurar la Base de Datos PostgreSQL

1. Abre tu cliente de PostgreSQL (pgAdmin, DBeaver o psql).
2. Crea una base de datos nombrada `jabil` o verifica las credenciales en `backend/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Port=5432;Database=jabil;Username=postgres;Password=1234"
   }
   ```
3. Ejecuta las instrucciones SQL que se encuentran en el archivo `scriptSQL.txt` para crear las tablas `Director` y `Movies`:
   ```sql
   CREATE TABLE Director (
       PKDirector integer NOT NULL PRIMARY KEY,
       Name varchar(100),
       Age integer,
       Active boolean 
   );

   CREATE TABLE Movies (
       PKMovies integer NOT NULL PRIMARY KEY,
       Name varchar(100), 
       Gender varchar(50),
       Duration time, 
       FKDirector integer
   );

   ALTER TABLE Movies
   ADD CONSTRAINT FK_Movies_Director 
   FOREIGN KEY (FKDirector) REFERENCES Director(PKDirector);
   ```

---

## Paso 3: Ejecutar el Backend (.NET C#)

1. Abre una terminal y navega a la carpeta `backend/`:
   ```bash
   cd backend
   ```
2. Ejecuta el comando para compilar y correr el servidor backend:
   ```bash
   dotnet run
   ```
3. El backend iniciara y estara escuchando en:
   - `http://localhost:5118` (API HTTP)
   - `https://localhost:7100` (API HTTPS)
   - Documentacion OpenAPI: `http://localhost:5118/openapi/v1.json`

---

## Paso 4: Ejecutar el Frontend (Angular con pnpm)

*Nota: Esta estrictamente prohibido el uso de npm. Usa unicamente pnpm.*

1. Abre otra terminal y navega a la carpeta `frontend/`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias necesarias usando `pnpm`:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo de Angular usando `pnpm`:
   ```bash
   pnpm start
   ```
4. Abre tu navegador web y entra a la siguiente direccion:
   ```text
   http://localhost:4200
   ```

---

## Resumen de Verificacion

- **Backend**: Responde peticiones HTTP en `http://localhost:5118/api/Director` y `http://localhost:5118/api/Movie`.
- **Frontend**: Pagina disponible en `http://localhost:4200` permitiendo agregar, ver, editar y eliminar registros de Directores y Peliculas.
