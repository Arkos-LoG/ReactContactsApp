using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Katana.Domain.Models;
using Katana.Domain.Abstract;


namespace Katana.Domain.Concrete
{

   
    public class ContactRepository : IContactRepository
    {

        public IEnumerable<Contact> GetAll()
        {
            return Contacts.ContactsList.OrderBy(c => c.Name).ToList(); // execute query immediately...
        }

        public Contact Get(double id)
        {
            return Contacts.ContactsList.Find(c => c.Id == id);
        }

        public IEnumerable<Contact> Add(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException("contact");
            }

            Contacts.ContactsList.Add(contact);

            return GetAll();
        }


        public IEnumerable<Contact> Update(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException("contact");
            }

            int index = Contacts.ContactsList.FindIndex(c => c.Id == contact.Id);
            if (index == -1)
            {
               throw new Exception($"UPDATE ERROR: contact id = {contact.Id} not found!");
            }

            Contacts.ContactsList.RemoveAt(index);
            Contacts.ContactsList.Add(contact);

            return GetAll();
        }

        public IEnumerable<Contact> Remove(double id)
        {
            if (Contacts.ContactsList.RemoveAll(c => c.Id == id) != 1)
            {
                throw new Exception($"DELETE ERROR: contact id = {id} not found!");
            }

            return GetAll();

        }

    }
}
