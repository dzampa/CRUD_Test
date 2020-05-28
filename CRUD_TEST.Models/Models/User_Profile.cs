using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD_TEST.Models.Models
{
    public class User_Profile
    {

        [Key]
        public decimal idUser { get; set; }
        [Key]
        public decimal idProfile { get; set; }
    }
}
