using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD_TEST.Models.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal idUser { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public decimal CPF { get; set; }
    }
}
