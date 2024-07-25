
using HealthCare.Services.CatalogAPI.Exceptions;

namespace HealthCare.Services.CatalogAPI.Features.Doctor.GetDoctorById
{
    public record GetDoctorByIdQuery(Guid Id) : IQuery<GetDoctorByIdResult>;
    public record GetDoctorByIdResult(Doctors Doctor);
    internal class GetDoctorByIdHandler(IDocumentSession session) 
        : IQueryHandler<GetDoctorByIdQuery, GetDoctorByIdResult>
    {
        public async Task<GetDoctorByIdResult> Handle(GetDoctorByIdQuery query, CancellationToken cancellationToken)
        {
            var doctor = await session.LoadAsync<Doctors>(query.Id, cancellationToken);

            if(doctor is null)
            {
                throw new DoctorNotFoundException(query.Id);
            }
            return new GetDoctorByIdResult(doctor);
        }
    }
}
