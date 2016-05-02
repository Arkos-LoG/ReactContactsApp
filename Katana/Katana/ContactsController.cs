using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Katana.Domain.Abstract;
using Katana.Domain.Models;
using Newtonsoft.Json.Linq;

namespace Katana
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ContactController : ApiController
    {
        private readonly IContactRepository _contactRepository;


        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        // GET api/contact
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_contactRepository.GetAll());  
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET api/contact/5
        public IHttpActionResult Get(double id)
        {
            //
            //  NOTE - THIS ISN'T BEING USED BUT WANTED TO SHOW HOW SERVER CACHING WOULD WORK
            //

            if (id < 1)
            {
                return BadRequest("Invalid Contact Id");
            }

            string key = string.Format("Get-{0}", id);
            Contact contact = null;

            try
            {
                if (!CacheHelper.Get(key, out contact))
                {
                    contact = _contactRepository.Get(id);
                    CacheHelper.Add(contact, key);
                }
                // else "contact" is in cache

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        // POST api/contact {contact}
        public IHttpActionResult Post([FromBody] JObject data)
        {

            try
            {
                var contact = data.ToObject<Contact>(); // this is one way to do it. I'll do a different way for PUT

                if (contact == null || contact.Id < 1)
                {
                    return BadRequest("No or bad data was sent.");
                }

                var result = _contactRepository.Add(contact);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        // PUT api/contact/ {contact}
        public IHttpActionResult Put(Contact contact)
        {
         
            try
            {
                if (contact == null || contact.Id < 1)
                {
                    return BadRequest("No or bad data was sent.");
                }

                var result = _contactRepository.Update(contact);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE api/contact/5
        public IHttpActionResult Delete(double id)
        {
            if (id < 1)
            {
                return BadRequest("Invalid Contact Id");
            }

            try
            {
                var result = _contactRepository.Remove(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}


