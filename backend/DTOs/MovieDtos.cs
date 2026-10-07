namespace backend.DTOs;

public record ActorDto(int Id, string Name, string Bio);
public record MovieDto(int Id, string Title, int ReleaseYear, List<ActorDto> Actors);

// Нов DTO за Create / Update
public record CreateMovieDto(string Title, int ReleaseYear, List<int>? ActorIds);