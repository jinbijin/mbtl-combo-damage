using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mbtl.UI.Model
{
    public class IndexResponse
    {
        public IEnumerable<Character> Characters { get; set; }
        public IEnumerable<Link> Links { get; set; }
    }
}
