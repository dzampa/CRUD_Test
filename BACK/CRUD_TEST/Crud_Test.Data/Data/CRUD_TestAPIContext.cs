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
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<User_Profile> User_Profiles { get; set; }
        public DbSet<Profile_Functionalities> Profile_Functionalities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Functionalities>().HasKey(e => new { e.idFunctionalities });
            modelBuilder.Entity<Profile>().HasKey(e => new { e.idProfile });
            modelBuilder.Entity<User>().HasKey(e => new { e.idUser });
            modelBuilder.Entity<User_Profile>().HasKey(e => new { e.idUser, e.idProfile });
            modelBuilder.Entity<Profile_Functionalities>().HasKey(e => new { e.idProfile, e.idFunctionalities });
        }
    }
}
