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
    [Route("api/character")]
    public class CharacterController : ControllerBase
    {
        [HttpPost]
        public async Task<int> AddCharacter([FromBody] AddCharacterRequest request)
        {
            using var db = DataContext.Instance;
            var character = new Data.Model.Character { Name = request.Name };
            await db.Characters.AddAsync(character);
            await db.SaveChangesAsync();

            return character.Id;
        }

        [HttpPatch]
        [Route("{characterId:int}/name")]
        public async Task SetCharacterName([FromQuery] int characterId, [FromBody] SetCharacterNameRequest request)
        {
            using var db = DataContext.Instance;
            var character = await db.Characters.FirstOrDefaultAsync(x => x.Id == characterId);
            character.Name = request.Name;
            await db.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("{characterId:int}")]
        public async Task RemoveCharacter([FromQuery] int characterId)
        {
            using var db = DataContext.Instance;
            var character = await db.Characters.FirstOrDefaultAsync(x => x.Id == characterId);
            db.Characters.Remove(character);
            await db.SaveChangesAsync();
        }
    }
}
