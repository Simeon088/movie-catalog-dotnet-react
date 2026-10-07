using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly AppDbContext _context;

    public MoviesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/movies
    // Get all movies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies()
    {
        var movies = await _context.Movies
            .Include(m => m.Actors)
            .Select(m => new MovieDto(
                m.Id,
                m.Title,
                m.ReleaseYear,
                m.Actors
                    .Select(a => new ActorDto(a.Id, a.Name, a.Bio))
                    .ToList()
            ))
            .ToListAsync();

        return Ok(movies);
    }

    // GET: api/movies/5
    // Get a single movie
    [HttpGet("{id}")]
    public async Task<ActionResult<MovieDto>> GetMovie(int id)
    {
        var movie = await _context.Movies
            .Include(m => m.Actors)
            .Where(m => m.Id == id)
            .Select(m => new MovieDto(
                m.Id,
                m.Title,
                m.ReleaseYear,
                m.Actors
                    .Select(a => new ActorDto(a.Id, a.Name, a.Bio))
                    .ToList()
            ))
            .FirstOrDefaultAsync();

        if (movie == null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    // GET: api/movies/actors
    // Get all available actors for the form
    [HttpGet("actors")]
    public async Task<ActionResult<IEnumerable<ActorDto>>> GetActors()
    {
        var actors = await _context.Actors
            .Select(a => new ActorDto(
                a.Id,
                a.Name,
                a.Bio
            ))
            .ToListAsync();

        return Ok(actors);
    }

    // POST: api/movies
    // Create a new movie
    [HttpPost]
    public async Task<ActionResult<MovieDto>> CreateMovie(CreateMovieDto dto)
    {
        var movie = new Movie
        {
            Title = dto.Title,
            ReleaseYear = dto.ReleaseYear
        };

        if (dto.ActorIds != null && dto.ActorIds.Any())
        {
            var actors = await _context.Actors
                .Where(a => dto.ActorIds.Contains(a.Id))
                .ToListAsync();

            movie.Actors = actors;
        }

        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();

        var resultDto = new MovieDto(
            movie.Id,
            movie.Title,
            movie.ReleaseYear,
            movie.Actors
                .Select(a => new ActorDto(a.Id, a.Name, a.Bio))
                .ToList()
        );

        return CreatedAtAction(
            nameof(GetMovie),
            new { id = movie.Id },
            resultDto
        );
    }

    // PUT: api/movies/5
    // Update a movie
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(
        int id,
        CreateMovieDto dto)
    {
        var movie = await _context.Movies
            .Include(m => m.Actors)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (movie == null)
        {
            return NotFound();
        }

        movie.Title = dto.Title;
        movie.ReleaseYear = dto.ReleaseYear;

        if (dto.ActorIds != null)
        {
            var actors = await _context.Actors
                .Where(a => dto.ActorIds.Contains(a.Id))
                .ToListAsync();

            movie.Actors = actors;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/movies/5
    // Delete a movie
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);

        if (movie == null)
        {
            return NotFound();
        }

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
