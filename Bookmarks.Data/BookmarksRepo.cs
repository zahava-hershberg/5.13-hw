using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Bookmarks.Data
{
    public class BookmarksRepo
    {
        private readonly string _connectionString;
        public BookmarksRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }
        public List<Bookmark> GetBookmarks(int id)
        {
            using var context = new BookmarksDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public void Update(String title, int id)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title= {title} where Id ={id}");
        }
        public void Delete(int id)
        {
            using var context = new BookmarksDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id={id}");
        }
    }
}
