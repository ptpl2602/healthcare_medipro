namespace HealthCare.Services.CatalogAPI.Models
{
    public class Doctors
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = default;
        public string LastName { get; set; } = default;
        public string Address { get; set; } = default;
        public string Phone { get; set; } = default;
        public string Email { get; set; } = default;
        public string? Website { get; set; } = default;
        public int Experience { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; } = default;
        public string SpecializationId { get; set; }
    }
}
