namespace HealthCare.Services.CatalogAPI.Models
{
    public class Hospitals
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default;
        public string Address { get; set; } = default;
        public string Phone { get; set; } = default;
        public string Email { get; set; } = default;
        public string Website { get; set; } = default;
        public List<string> ImageUrls { get; set; } = new();
        public string Description { get; set; } = default;
    }
}
