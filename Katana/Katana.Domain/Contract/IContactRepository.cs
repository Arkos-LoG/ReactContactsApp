using System.Collections.Generic;
using Katana.Domain.Models;

namespace Katana.Domain.Abstract
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAll();
        Contact Get(double id);
        IEnumerable<Contact> Add(Contact contact);
        IEnumerable<Contact> Remove(double id);
        IEnumerable<Contact> Update(Contact contact);
    }
}
