using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("movies")]
public class Movie
{
    [Key]
    [Column("pkmovies")]
    public int PKMovies { get; set; }

    [Column("name")]
    public string? Name { get; set; }


    [Column("gender")]
    public string? Gender { get; set; }

    [Column("duration")]
    public TimeSpan? Duration { get; set; }

    // fk del director
    [Column("fkdirector")]
    public int? FKDirector { get; set; }
}
