using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DirectorController : ControllerBase
{
    // contexto de la db
    private readonly AppDbContext _db;

    public DirectorController(AppDbContext db)
    {
        _db = db;
    }

    // saca todos los directores
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        // agarra todo
        var lista = await _db.Director.ToListAsync();
        return Ok(lista);
    }

    // busca por id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var d = await _db.Director.FindAsync(id);
        if (d == null)
        {
            return NotFound("Record not found (id)");
        }
        return Ok(d);
    }

    // guarda nuevo director
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Director d)
    {
        // si no manda id calcula uno
        if (d.PKDirector == 0)
        {
            var maxId = await _db.Director.MaxAsync(x => (int?)x.PKDirector) ?? 0;
            d.PKDirector = maxId + 1;
        }

        _db.Director.Add(d);
        await _db.SaveChangesAsync();
        return Ok(d);
    }

    // actualiza los datos
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Director d)
    {
        var viejo = await _db.Director.FindAsync(id);
        if (viejo == null)
        {
            return NotFound("REcord not found");
        }

        viejo.Name = d.Name;
        viejo.Age = d.Age;
        viejo.Active = d.Active;

        await _db.SaveChangesAsync();
        return Ok(viejo);
    }

    // borra
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var d = await _db.Director.FindAsync(id);
        if (d == null)
        {
            return NotFound("Record not found");
        }

        _db.Director.Remove(d);
        await _db.SaveChangesAsync();
        return Ok("eliminado ok");
    }
}
