using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    // conexion db
    private readonly AppDbContext _db;

    public MovieController(AppDbContext db)
    {
        _db = db;
    }

    // lista pelis
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var lista = await _db.Movies.ToListAsync();
        return Ok(lista);
    }

    // peli por id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var p = await _db.Movies.FindAsync(id);
        if (p == null)
        {
            return NotFound(new { message = "no hay nada" });
        }
        return Ok(p);
    }

    // mete pelicula
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Movie p)
    {
        if (p.FKDirector == 0)
        {
            p.FKDirector = null;
        }

        if (p.PKMovies == 0)
        {
            var maxId = await _db.Movies.MaxAsync(x => (int?)x.PKMovies) ?? 0;
            p.PKMovies = maxId + 1;
        }

        _db.Movies.Add(p);
        await _db.SaveChangesAsync();
        return Ok(p);
    }

    // edita pelicula
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Movie p)
    {
        var anterior = await _db.Movies.FindAsync(id);
        if (anterior == null)
        {
            return NotFound(new { message = "movie not found" });
        }

        if (p.FKDirector == 0)
        {
            p.FKDirector = null;
        }

        anterior.Name = p.Name;
        anterior.Gender = p.Gender;
        anterior.Duration = p.Duration;
        anterior.FKDirector = p.FKDirector;

        await _db.SaveChangesAsync();
        return Ok(anterior);
    }

    // quita pelicula
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Movies.FindAsync(id);
        if (p == null)
        {
            return NotFound(new { message = "record not found [movie]" });
        }

        _db.Movies.Remove(p);
        await _db.SaveChangesAsync();
        return Ok(new { message = "[movie] removed" });
    }
}
