using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD_TEST.Models.Models
{
    public class UserProfiles
    {
        public int idUser { get; set; }
        public string Name { get; set; }
        public decimal CPF { get; set; }
        public string Type { get; set; }
    }
}
