namespace HealthCare.Services.CatalogAPI.Exceptions
{
    public class HospitalNotFoundException : NotFoundException
    {
        public HospitalNotFoundException(Guid Id) : base("Hospital", Id)
        {
        }
    }

    public class HospitalServiceNotFoundException : NotFoundException
    {
        public HospitalServiceNotFoundException(Guid Id) : base("Hospital's Service", Id)
        {
        }
    }

    public class HospitalSpecializationNotFoundException : NotFoundException
    {
        public HospitalSpecializationNotFoundException(Guid Id) : base("Hospital's Specialization", Id)
        {
        }
    }
}
