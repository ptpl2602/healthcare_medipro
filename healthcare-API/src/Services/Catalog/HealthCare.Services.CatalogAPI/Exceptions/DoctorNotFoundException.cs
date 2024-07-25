
namespace HealthCare.Services.CatalogAPI.Exceptions
{
    public class DoctorNotFoundException : NotFoundException
    {
        public DoctorNotFoundException(Guid Id) : base("Doctor", Id)
        {
        }
    }
}
