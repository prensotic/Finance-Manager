using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagerBackend.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Card> Cards { get; set; } = null!;
        public DbSet<Transaction> Transactions { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options)
        {
            //Database.EnsureDeleted();      
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            var hasher = new PasswordHasher<User>();
            modelBuilder.Entity<User>().HasData(
                //new User
                //{
                //    Id = "fixed-guid-1234-5678", // ФИКСИРОВАННЫЙ GUID
                //    FirstName = "Илья",
                //    LastName = "Логинов",
                //    MiddleName = "Васильевич",
                //    PhoneNumber = "89877116595",
                //    Email = "ilya@mail.ru",
                //    Password = hasher.HashPassword(null!, "12345")
                //}
            );

            //modelBuilder.Entity<User>().HasData(
            //    //new User { Id = Guid.NewGuid().ToString(), FirstName = "Илья", LastName = "Логинов", MiddleName = "Васильевич", PhoneNumber = "89877116595", Email = "ilya@mail.ru", Password = "12345"}
                
            //);
            modelBuilder.Entity<Card>().HasData();
            modelBuilder.Entity<Transaction>().HasData();
        }
    }
}
