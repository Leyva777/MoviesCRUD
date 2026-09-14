using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Director")]
public class Director
{
    [Key]
    [Column("pkdirector")]
    public int PKDirector { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("age")]
    public int? Age { get; set; }

    [Column("active")]
    public bool? Active { get; set; }
}
