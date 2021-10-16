using System.ComponentModel.DataAnnotations;

namespace Mbtl.UI.Model
{
    public class AddCharacterRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
