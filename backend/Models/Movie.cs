namespace backend.Models;
public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public List<Actor> Actors { get; set; } = new();
}


