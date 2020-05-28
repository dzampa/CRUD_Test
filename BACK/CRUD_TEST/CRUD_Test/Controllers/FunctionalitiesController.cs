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
    public class FunctionalitiesController : ControllerBase
    {
        private readonly CRUD_TestAPIContext _context;

        public FunctionalitiesController(CRUD_TestAPIContext context)
        {
            _context = context;
        }

        // GET: api/Functionalities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Functionalities>>> GetFunctionalities()
        {
            return await _context.Functionalities.ToListAsync();
        }

        // GET: api/Functionalities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Functionalities>> GetFunctionalities(int id)
        {
            var functionalities = await _context.Functionalities.FindAsync(id);

            if (functionalities == null)
            {
                return NotFound();
            }

            return functionalities;
        }

        // PUT: api/Functionalities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFunctionalities(int id, Functionalities functionalities)
        {
            if (id != functionalities.idFunctionalities)
            {
                return BadRequest();
            }

            _context.Entry(functionalities).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FunctionalitiesExists(id))
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

        // POST: api/Functionalities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Functionalities>> PostFunctionalities(Functionalities functionalities)
        {
            _context.Functionalities.Add(functionalities);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFunctionalities", new { id = functionalities.idFunctionalities }, functionalities);
        }

        // DELETE: api/Functionalities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Functionalities>> DeleteFunctionalities(int id)
        {
            var functionalities = await _context.Functionalities.FindAsync(id);
            if (functionalities == null)
            {
                return NotFound();
            }

            _context.Functionalities.Remove(functionalities);
            await _context.SaveChangesAsync();

            return functionalities;
        }

        private bool FunctionalitiesExists(int id)
        {
            return _context.Functionalities.Any(e => e.idFunctionalities == id);
        }
    }
}
