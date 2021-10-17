using System.ComponentModel.DataAnnotations;

namespace Mbtl.Data.Model
{
    public class Character
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
