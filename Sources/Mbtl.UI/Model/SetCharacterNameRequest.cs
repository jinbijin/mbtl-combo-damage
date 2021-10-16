using System.ComponentModel.DataAnnotations;

namespace Mbtl.UI.Model
{
    public class SetCharacterNameRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
