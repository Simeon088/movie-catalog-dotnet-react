using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=movies.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Movies.Any())
    {
        var actor1 = new Actor { Name = "Кристиан Бейл", Bio = "Известен с драматичните си физически трансформации." };
        var actor2 = new Actor { Name = "Хийт Леджър", Bio = "Легендарен с ролята си на Джокера." };
        var actor3 = new Actor { Name = "Леонардо Ди Каприо", Bio = "Носител на Оскар, известен с ролите си в драматични филми." };

        var movie1 = new Movie { Title = "Тъмният рицар", ReleaseYear = 2008, Actors = new List<Actor> { actor1, actor2 } };
        var movie2 = new Movie { Title = "Генезис (Inception)", ReleaseYear = 2010, Actors = new List<Actor> { actor1, actor3 } };

        db.Movies.AddRange(movie1, movie2);
        db.SaveChanges();
    }
}

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();
