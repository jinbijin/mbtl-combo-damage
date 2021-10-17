using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mbtl.UI.Model
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Link> Links { get; set; }
    }
}
