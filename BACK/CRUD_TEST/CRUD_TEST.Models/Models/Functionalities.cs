using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_TEST.Models.Models
{
    public class Functionalities
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal idFunctionalities { get; set; }
        [Required]
        [StringLength(100)]
        public string Type { get; set; }
    }
}
