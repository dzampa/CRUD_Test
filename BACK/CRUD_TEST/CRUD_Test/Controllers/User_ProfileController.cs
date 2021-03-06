﻿using System;
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
    public class User_ProfileController : ControllerBase
    {
        private readonly CRUD_TestAPIContext _context;

        public User_ProfileController(CRUD_TestAPIContext context)
        {
            _context = context;
        }

        // GET: api/User_Profile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_Profile>>> GetUser_Profiles()
        {
            return await _context.User_Profile.ToListAsync();
        }

        // GET: api/User_Profile/userprofile
        [HttpGet("userprofile")]
        public ActionResult<IEnumerable<UserProfiles>> GetUserProf()
        {
            var user = from us in _context.User
                       join uspr in _context.User_Profile
                       on us.idUser equals uspr.idUser into USPR
                       from usp in USPR.DefaultIfEmpty()
                       join pr in _context.Profile
                       on usp.idProfile equals pr.idProfile into PROF
                       from m in PROF.DefaultIfEmpty()
                       select new
                       {
                           us.idUser,
                           us.Name,
                           us.CPF,
                           Type = m.Type
                       };

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // GET: api/User_Profile/5
        [HttpGet("{idProfile}")]
        public async Task<ActionResult<IEnumerable<User_Profile>>> GetUser_Profile(int idProfile)
        {
            var user_Profile = await _context.User_Profile.Where(e => e.idProfile == idProfile).ToListAsync();

            if (user_Profile == null)
            {
                return NotFound();
            }

            return user_Profile;
        }

        // GET: api/User_Profile/byuserid/5
        [HttpGet("byuserid/{idUser}")]
        public async Task<ActionResult<IEnumerable<User_Profile>>> GetUser_ProfileUser(int idUser)
        {
            var user_Profile = await _context.User_Profile.Where(e => e.idUser == idUser).ToListAsync();

            if (user_Profile == null)
            {
                return NotFound();
            }

            return user_Profile;
        }

        // PUT: api/User_Profile/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{idUser}")]
        public async Task<IActionResult> PutUser_Profile(int idUser, User_Profile user_Profile)
        {
            if (idUser != user_Profile.idUser)
            {
                return BadRequest();
            }

            _context.Entry(user_Profile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!User_ProfileExists(idUser))
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

        // POST: api/User_Profile
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User_Profile>> PostUser_Profile(User_Profile user_Profile)
        {
            _context.User_Profile.Add(user_Profile);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (User_ProfileExists(user_Profile.idUser))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser_Profile", new { id = user_Profile.idUser }, user_Profile);
        }

        // DELETE: api/User_Profile/5
        [HttpDelete("{idProfile}")]
        public async Task<ActionResult<User_Profile>> DeleteUser_Profile(int idProfile)
        {
            var user_Profile = await _context.User_Profile.Where(e => e.idProfile == idProfile).FirstOrDefaultAsync();
            if (user_Profile == null)
            {
                return NotFound();
            }

            _context.User_Profile.Remove(user_Profile);
            await _context.SaveChangesAsync();

            return user_Profile;
        }
        // DELETE: api/User_Profile/byuserid/5
        [HttpDelete("byuserid/{idUser}")]
        public async Task<ActionResult<User_Profile>> DeleteUser_ProfileUser(int idUser)
        {
            var user_Profile = await _context.User_Profile.Where(e => e.idUser == idUser).FirstOrDefaultAsync();
            if (user_Profile == null)
            {
                return Ok();
            }

            _context.User_Profile.Remove(user_Profile);
            await _context.SaveChangesAsync();

            return user_Profile;
        }

        private bool User_ProfileExists(int id)
        {
            return _context.User_Profile.Any(e => e.idUser == id);
        }
    }
}
