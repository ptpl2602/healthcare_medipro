namespace HealthCare.Services.CatalogAPI.Domain
{
    public class Hospitals
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default;
        public string Address { get; set; } = default;
        public string Phone { get; set; } = default;
        public string Email { get; set; } = default;
        public string Website { get; set; } = default;
        public string ImageAvatar { get; set; } = default;
        public List<string>? ImageDescriptions { get; set; } = new();
        public string Description { get; set; } = default;
        public List<HospitalServices> HospitalServices { get; set; }
        public List<HospitalSpecializations> HospitalSpecializations { get; set; }
    }
}
