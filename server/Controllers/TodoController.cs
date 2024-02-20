using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Models;
using TodoAPI.ViewModels;

namespace TodoAPI.Controllers
{
    [ApiController]
    public class TodoController : ControllerBase
    {

        [HttpGet]
        [Route("todos")]
        public async Task<IActionResult> GetAsync([FromServices] AppDbContext context)
        {
            var todos = await context
            .Todos
            .AsNoTracking()
            .ToListAsync();

            return Ok(todos);
        }

        [HttpGet]
        [Route("todos/{id}")]
        public async Task<IActionResult> GetByIdAsync([FromServices] AppDbContext context, [FromRoute] int id)
        {
            var todo = await context
            .Todos
            .AsNoTracking()
            .FirstOrDefaultAsync(todo => todo.Id == id);

            return todo == null ? NotFound() : Ok(todo);
        }

        [HttpPost]
        [Route("todos")]
        public async Task<IActionResult> PostAsync([FromServices] AppDbContext context, [FromBody] CreateTodoViewModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var todo = new Todo
            {
                Done = false,
                Title = model.Title
            };

            try
            {
                await context.Todos.AddAsync(todo);
                await context.SaveChangesAsync();
                return Created($"v1/todos/{todo.Id}", todo);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPatch]
        [Route("todos/{id}")]
        public async Task<IActionResult> PatchAsync([FromServices] AppDbContext context, [FromBody] UpdateTodoViewModel model, [FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var todo = await context.Todos.FirstOrDefaultAsync(todo => todo.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            try
            {
                if (model.Title != null)
                {
                    todo.Title = model.Title;
                }

                if (model.Done != null)
                {
                    todo.Done = (bool)model.Done;
                }

                context.Todos.Update(todo);
                await context.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("todos/{id}")]
        public async Task<IActionResult> DeleteAsync([FromServices] AppDbContext context, [FromRoute] int id)
        {
            var todo = await context.Todos.FirstOrDefaultAsync(todo => todo.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            try
            {
                context.Todos.Remove(todo);
                await context.SaveChangesAsync();
                return Ok(new
                {
                    success = true
                });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }

}