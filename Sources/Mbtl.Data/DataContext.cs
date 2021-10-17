using Mbtl.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mbtl.Data
{
    public class DataContext : DbContext
    {
        public static DataContext Instance => new DataContext();

        public string DbPath { get; }
        public DbSet<Character> Characters { get; set; }

        public DataContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = $"{path}{Path.DirectorySeparatorChar}MBTL-CDU{Path.DirectorySeparatorChar}data.db";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Character>().HasIndex(x => x.Name).IsUnique();
        }
    }
}
