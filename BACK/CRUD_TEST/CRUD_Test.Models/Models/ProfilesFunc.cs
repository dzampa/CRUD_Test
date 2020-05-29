using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD_TEST.Models.Models
{
    public class ProfilesFunc
    {
        public int idProfile { get; set; }
        public string Type { get; set; }
        public List<Functionalities> functionalities { get; set; }
    }
}
