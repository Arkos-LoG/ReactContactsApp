using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Katana.Domain.Concrete;
using Katana.Domain.Models;
using Katana;
using System.Web.Http.Results;

namespace Tests
{
    [TestClass]
    public class UnitTestContacts
    {
        private const double CONTACT_ID = 1;
        private const int INDEX_FOR_CONTACT_ID = 0;

        [TestMethod]
        public void GetAllContacts_ShouldReturnAllContacts()
        {
            // Arrange
            var testContacts = GetTestContacts();
            var controller = new ContactController(new ContactRepository());

            // Act
            var result = controller.Get() as OkNegotiatedContentResult<IEnumerable<Contact>>;

            // Assert
            var content = result.Content as IEnumerable<Contact>;

            Assert.AreEqual(testContacts.Count, (content as List<Contact>).Count);
        }

        [TestMethod]
        public void GetContact_ShouldReturnCorrectContact()
        {
            // Arrange
            var testContacts = GetTestContacts();
            var controller = new ContactController(new ContactRepository());

            // Act
            var result = controller.Get(CONTACT_ID);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(testContacts[INDEX_FOR_CONTACT_ID].Name, (result as OkNegotiatedContentResult<Contact>).Content.Name);

        }

        [TestMethod]
        public void DeleteContact_ShouldNotFindContactAfterDelete()
        {
            // Arrange
            var testContacts = GetTestContacts();
            var controller = new ContactController(new ContactRepository());

            // Act
            controller.Delete(CONTACT_ID); // NOTE: we know it's there from previous test pass
            var getAfterDeleteResult = controller.Get(CONTACT_ID);

            // Assert
            Assert.IsNull((getAfterDeleteResult as OkNegotiatedContentResult<Contact>).Content);

        }

        [TestMethod]
        public void AddContact_ShouldExistAfterAdd()
        {
            // Arrange
            var controller = new ContactController(new ContactRepository());
            var contact = new Contact { Id = CONTACT_ID, Name = "Larry Smith", Email = "larryDude@gmail.com", Address = "8484 nice st, NewYork NY 10001", Phone = "1234567890" };

            // Act
            var result = controller.Post(contact) as OkNegotiatedContentResult<IEnumerable<Contact>>;

            // Assert        
            Assert.IsNotNull((result.Content as List<Contact>).Find(x => (x as Contact).Name == "Larry Smith"));
        }

        //
        // TODO: add test for updating a contact
        //

        private List<Contact> GetTestContacts()
        {
            var testContacts = new List<Contact>()
            {
               new Contact { Id = 1, Name = "Larry Smith", Email = "larryDude@gmail.com", Address = "8484 nice st, NewYork NY 10001", Phone = "1234567890" },
               new Contact { Id = 2, Name = "Kaiser Soshe", Email = "halo90210@skynet.net", Address = "45 main st, Palo Alto CA 90210", Phone = "8484849300" },
               new Contact { Id = 3, Name = "Sue Rogers", Email = "suesoccermom@yahoo.com", Address = "8484 ocean dr, Miami FL 79888", Phone = "4848493003" },
            };

            return testContacts;
        }


    }
}



//[TestMethod]
//public bool GetContact_ShouldReturnCorrectContact(double? id = null)
//{
//    // Arrange
//    id = 3;
//    var testContacts = GetTestContacts();
//    var controller = new ContactController(new ContactRepository());

//    // Act
//    var result = controller.Get((double)id);

//    // Assert
//    Assert.IsNotNull(result);
//    Assert.AreEqual(testContacts[2].Name, (result as OkNegotiatedContentResult<Katana.Domain.Models.Contact>).Content.Name);
//    return true;
//}