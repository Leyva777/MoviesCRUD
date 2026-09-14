using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

// conecta a la bd
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // tabla directores
    public DbSet<Director> Director { get; set; }

    // tabla pelis
    public DbSet<Movie> Movies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // mapeos para que postgres no llore por mayusculas
        modelBuilder.Entity<Director>().ToTable("director");
        modelBuilder.Entity<Movie>().ToTable("movies");
    }
}
