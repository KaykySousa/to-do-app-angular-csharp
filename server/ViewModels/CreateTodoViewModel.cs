using System.ComponentModel.DataAnnotations;

namespace TodoAPI.ViewModels {
    public class CreateTodoViewModel {

        [Required]
        public string? Title { get; set; }
    }
}