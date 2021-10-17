using Mbtl.UI.Model;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Mbtl.UI.Mapping
{
    public class CharacterMapper
    {
        public static Expression<Func<Data.Model.Character, Character>> Map =
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
