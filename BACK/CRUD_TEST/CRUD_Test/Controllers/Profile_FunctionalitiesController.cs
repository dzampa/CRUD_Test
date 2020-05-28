using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD_TEST.Models.Models;
using Crud_Test.Data.Data;

namespace CRUD_Test.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Profile_FunctionalitiesController : ControllerBase
    {
        private readonly CRUD_TestAPIContext _context;

        public Profile_FunctionalitiesController(CRUD_TestAPIContext context)
        {
            _context = context;
        }

        // GET: api/Profile_Functionalities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile_Functionalities>>> GetProfile_Functionalities()
        {
            return await _context.Profile_Functionalities.ToListAsync();
        }

        // GET: api/Profile_Functionalities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile_Functionalities>> GetProfile_Functionalities(int id)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.FindAsync(id);

            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            return profile_Functionalities;
        }

        // PUT: api/Profile_Functionalities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfile_Functionalities(int id, Profile_Functionalities profile_Functionalities)
        {
            if (id != profile_Functionalities.idProfile)
            {
                return BadRequest();
            }

            _context.Entry(profile_Functionalities).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Profile_FunctionalitiesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Profile_Functionalities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Profile_Functionalities>> PostProfile_Functionalities(Profile_Functionalities profile_Functionalities)
        {
            _context.Profile_Functionalities.Add(profile_Functionalities);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Profile_FunctionalitiesExists(profile_Functionalities.idProfile))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProfile_Functionalities", new { id = profile_Functionalities.idProfile }, profile_Functionalities);
        }

        // DELETE: api/Profile_Functionalities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Profile_Functionalities>> DeleteProfile_Functionalities(int id)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.FindAsync(id);
            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            _context.Profile_Functionalities.Remove(profile_Functionalities);
            await _context.SaveChangesAsync();

            return profile_Functionalities;
        }

        private bool Profile_FunctionalitiesExists(int id)
        {
            return _context.Profile_Functionalities.Any(e => e.idProfile == id);
        }
    }
}
