using FinanceManagerBackend.Endpoints;
using FinanceManagerBackend.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAppServices(builder.Configuration);

builder.Services.AddJwtAuthentication();
builder.Services.AddAppCors();

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowVite");
app.UseAuthentication();
app.UseAuthorization();

app.MapAuthEndpoints();
app.MapCardEndpoints();
app.MapTransactionEndpoints();
app.MapUserEndpoints();

app.Run();
