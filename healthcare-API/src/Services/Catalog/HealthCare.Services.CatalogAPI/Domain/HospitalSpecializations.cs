namespace HealthCare.Services.CatalogAPI.Domain
{
    public class HospitalSpecializations
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid HospitalId { get; set; }
        public string? Description { get; set; }
    }
}
