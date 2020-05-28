using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CRUD_TEST.Models.Models
{
    public class Profile_Functionalities
    {
        [Key]
        public decimal idProfile { get; set; }
        [Key]
        public decimal idFunctionalities { get; set; }
    }
}
