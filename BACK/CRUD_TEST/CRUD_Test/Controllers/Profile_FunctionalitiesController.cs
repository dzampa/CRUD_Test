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

        // GET: api/Profile_Functionalities/profilefunc
        [HttpGet("profilefunc")]
        public ActionResult<IEnumerable<ProfilesFunc>> GetUserProf()
        {

            List<ProfilesFunc> profilesFuncs = new List<ProfilesFunc>();

            var profiles = new ProfilesController(_context).GetProfiles().Result;

            if (profiles == null)
            {
                return NotFound();
            }

            foreach (var profilex in profiles.Value) 
            {
                var result = from func in _context.Functionalities
                             join prf in _context.Profile_Functionalities
                             on func.idFunctionalities equals prf.idFunctionalities into PRF
                             from prf in PRF.DefaultIfEmpty()
                             where prf.idProfile == profilex.idProfile
                             select new
                             {
                                 func.idFunctionalities,
                                 func.Type
                             };

                ProfilesFunc x = new ProfilesFunc();

                x.idProfile = profilex.idProfile;
                x.Type = profilex.Type;
                x.functionalities = result.Select(a => new Functionalities { idFunctionalities = a.idFunctionalities, Type = a.Type }).ToList();

                profilesFuncs.Add(x);

            }             

            return Ok(profilesFuncs);
        }

        // GET: api/Profile_Functionalities/5
        [HttpGet("{idFunctionalities}")]
        public async Task<ActionResult<IEnumerable<Profile_Functionalities>>> GetProfile_Functionalities(int idFunctionalities)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.Where(e => e.idFunctionalities == idFunctionalities).ToListAsync();

            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            return profile_Functionalities;
        }

        // GET: api/Profile_Functionalities/byidprofile/5
        [HttpGet("byidprofile/{idProfile}")]
        public async Task<ActionResult<IEnumerable<Profile_Functionalities>>> GetProfile_FunctionalitiesProfile(int idProfile)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.Where(e => e.idProfile == idProfile).ToListAsync();

            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            return profile_Functionalities;
        }

        // PUT: api/Profile_Functionalities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{idProfile}")]
        public async Task<IActionResult> PutProfile_Functionalities(int idProfile, Profile_Functionalities profile_Functionalities)
        {
            if (idProfile != profile_Functionalities.idProfile)
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
                if (!Profile_FunctionalitiesExists(idProfile))
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
        [HttpDelete("{idFunctionalities}")]
        public async Task<ActionResult<Profile_Functionalities>> DeleteProfile_Functionalities(int idFunctionalities)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.Where(e => e.idFunctionalities == idFunctionalities).FirstOrDefaultAsync();
            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            _context.Profile_Functionalities.Remove(profile_Functionalities);
            await _context.SaveChangesAsync();

            return profile_Functionalities;
        }

        // DELETE: api/Profile_Functionalities/byidprofile/5
        [HttpDelete("bytype/{idProfile}")]
        public async Task<ActionResult<IEnumerable<Profile_Functionalities>>> DeleteProfile_FunctionalitiesProfile(int idProfile)
        {
            var profile_Functionalities = await _context.Profile_Functionalities.Where(e => e.idProfile == idProfile).ToListAsync();
            if (profile_Functionalities == null)
            {
                return NotFound();
            }

            _context.Profile_Functionalities.RemoveRange(profile_Functionalities);
            await _context.SaveChangesAsync();

            return profile_Functionalities;
        }
        private bool Profile_FunctionalitiesExists(int id)
        {
            return _context.Profile_Functionalities.Any(e => e.idProfile == id);
        }
    }
}
