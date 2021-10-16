using Mbtl.Data;
using Mbtl.UI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mbtl.UI.Controllers
{
    [ApiController]
    [Route("api")]
    public class IndexController : ControllerBase
    {
        [HttpGet]
        public async Task<IndexResponse> Get()
        {
            using var db = DataContext.Instance;
            return new IndexResponse
            {
                Characters = await db.Characters.Select(x => new Character { Id = x.Id, Name = x.Name, Links = new List<Link>() }).ToListAsync(),
                Links = new List<Link>()
            };
        }
    }
}
