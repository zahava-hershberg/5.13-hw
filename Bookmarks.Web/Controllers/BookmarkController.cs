using Bookmarks.Data;
using Bookmarks.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarksRepo(_connectionString);
            repo.AddBookmark(bookmark);
        }
        [HttpGet("getbookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var repo = new BookmarksRepo(_connectionString);
            var userRepo = new UserRepo(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            return repo.GetBookmarks(user.Id);
        }
        [HttpPost("update")]
        public void Update (UpdateViewModel vm)
        {
            var repo = new BookmarksRepo(_connectionString);
            repo.Update(vm.Title, vm.Id);
        }
        [HttpPost("delete")]
        public void Delete(UpdateViewModel vm)
        {
            var repo = new BookmarksRepo(_connectionString);
            repo.Delete(vm.Id);
        }
       
    }
}
