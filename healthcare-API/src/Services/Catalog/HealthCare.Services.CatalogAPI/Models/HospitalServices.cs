namespace HealthCare.Services.CatalogAPI.Models
{
    public class HospitalServices
    {
        public string Id { get; set; }
        public Guid HospitalId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
    }
}
