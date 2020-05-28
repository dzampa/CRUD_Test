using CRUD_TEST.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace Crud_Test.Data.Data
{
    public class CRUD_TestAPIContext : DbContext
    {
        public CRUD_TestAPIContext(DbContextOptions<CRUD_TestAPIContext> options)
            : base(options)
        { 
        }

        public DbSet<Functionalities> Functionalities { get; set; }
        public DbSet<Profile> Profile { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<User_Profile> User_Profile { get; set; }
        public DbSet<Profile_Functionalities> Profile_Functionalities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Functionalities>(b=> {
                b.HasKey(e => e.idFunctionalities);
                b.Property(e => e.idFunctionalities).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Profile>(b=> { 
                b.HasKey(e => new { e.idProfile });
                b.Property(e => e.idProfile).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<User>(b => {
                b.HasKey(e => new { e.idUser });
                b.Property(e => e.idUser).ValueGeneratedOnAdd();                
            });
            modelBuilder.Entity<User_Profile>(b => {
                b.HasKey(e => new { e.idUser, e.idProfile });
            });
            modelBuilder.Entity<Profile_Functionalities>(b => {
                b.HasKey(e => new { e.idFunctionalities, e.idProfile });
            });
        }
    }
}
