namespace HealthCare.Services.CatalogAPI.Models
{
    public class HospitalSpecialization
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Guid HospitalId { get; set; }
        public string? Description { get; set; }
    }
}
