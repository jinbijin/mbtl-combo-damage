using Mbtl.Data;
using Mbtl.UI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
                Characters = await db.Characters.Select(MapCharacter).ToListAsync(),
                Links = new List<Link>
                {
                    new Link { Key = "AddCharacter", Method = "POST", Href = "character" }
                }
            };
        }

        private static Expression<Func<Data.Model.Character, Character>> MapCharacter =
            character => new Character
            {
                Id = character.Id,
                Name = character.Name,
                Links = new List<Link>
                {
                    new Link { Key = "SetName", Method = "PATCH", Href = $"character/{character.Id}/name" },
                    new Link { Key = "Delete", Method = "DELETE", Href = $"character/{character.Id}" },
                }
            };
    }
}
