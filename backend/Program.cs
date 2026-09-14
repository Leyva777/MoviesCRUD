using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// mete los controladores para la api
builder.Services.AddControllers();

// jala la bd de appsettings.json
var connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connString));

// cors para que angular no chille
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// usa cors
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// mapea las rutas de los controllers
app.MapControllers();

// arranca el backend
app.Run();
