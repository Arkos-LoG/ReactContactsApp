using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Katana.Domain.Models;

namespace Katana.Domain.Concrete
{
    public static class Contacts
    {

        public static List<Contact> ContactsList { get; private set; }

        static Contacts()
        {
            ContactsList = new List<Contact>()
            {
               new Contact { Id = 1, Name = "Larry Smith", Email = "larryDude@gmail.com", Address = "8484 nice st, NewYork NY 10001", Phone = "1234567890" },
               new Contact { Id = 2, Name = "Kaiser Soshe", Email = "halo90210@skynet.net", Address = "45 main st, Palo Alto CA 90210", Phone = "8484849300" },
               new Contact { Id = 3, Name = "Sue Rogers", Email = "suesoccermom@yahoo.com", Address = "8484 ocean dr, Miami FL 79888", Phone = "4848493003" },
            };

        }

    }
}
